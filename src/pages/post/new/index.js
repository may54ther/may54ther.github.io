import { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import MDEditor from '@uiw/react-md-editor';

import useGithubAuth from '/src/hooks/useGithubAuth';

export default function IssuePage() {
  const { user, token, loading, login, logout, checkAndRefreshToken } = useGithubAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    checkAndRefreshToken();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!user) {
    return <button onClick={login}>Github 로그인</button>;
  }

  if (user.reloadUserInfo?.screenName !== 'may54ther') {
    return (
      <div>
        권한이 없습니다. <button onClick={logout}>로그아웃</button>
      </div>
    );
  }

  async function handleSubmit() {
    setStatus('처리 중...');
    try {
      await checkAndRefreshToken();
      const octokit = new Octokit({ auth: token });
      const branchName = `post-${Date.now()}`;
      const owner = 'may54ther';
      const repo = 'may54ther.github.io';

      const { data: refData } = await octokit.git.getRef({
        owner, repo, ref: 'heads/main'
      });
      const sha = refData.object.sha;

      await octokit.git.createRef({
        owner, repo,
        ref: `refs/heads/${branchName}`,
        sha
      });

      const mdContent = `# ${title}\n\n${content}`;
      await octokit.repos.createOrUpdateFileContents({
        owner, repo,
        path: `.inbox/${branchName}.md`,
        message: `Add post: ${title}`,
        content: btoa(unescape(encodeURIComponent(mdContent))),
        branch: branchName
      });

      // await octokit.issues.create({
      //   owner, repo,
      //   title: `[New Post] ${title}`,
      //   body: `새 포스트가 등록되었습니다.\n\n브랜치: ${branchName}\n\n내용:\n\n${mdContent}`
      // });

      setStatus('등록 완료!');
    } catch (e) {
      setStatus('에러 발생: ' + e.message);
    }
  }

  return (
    <div>
      <h2>새 포스트 등록</h2>
      <input
        placeholder="제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <MDEditor value={content} onChange={setContent} height={300} />
      <button onClick={handleSubmit} style={{ marginTop: 16 }}>등록</button>
      <div>{status}</div>
      <button onClick={logout} style={{ marginTop: 16 }}>로그아웃</button>
    </div>
  );
}
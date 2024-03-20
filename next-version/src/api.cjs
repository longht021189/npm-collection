export const getTags = async (owner, repo, pattern, token) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/tags`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        'pattern': pattern
      })
    }
  )

  const data = await response.json()
  console.log(`data: ${JSON.stringify(data)}`);
  
  return []
}
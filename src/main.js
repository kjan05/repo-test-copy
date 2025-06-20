const SUPABASE_URL = 'https://ukenyrinoivbdetlupyp.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrZW55cmlub2l2YmRldGx1cHlwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTU1NDgwNSwiZXhwIjoyMDY1MTMwODA1fQ.qTIKiiy6YSrs4mo_tzUFdXxtGHq78gmxnbkHe2djU8Q'
const TABLE = 'article'

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
}

async function loadArticles() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}?select=*&order=created_at.desc`, { headers })
  const data = await res.json()
  const container = document.getElementById('articles')
  container.innerHTML = data.map(a => `
    <div>
      <h2>${a.title}</h2>
      <h4>${a.subtitle}</h4>
      <p>${a.author}</p>
      <p>${new Date(a.created_at).toLocaleDateString()}</p>
      <p>${a.content}</p>
      <hr />
    </div>
  `).join('')
}

document.getElementById('articleForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  const form = new FormData(e.target)
  const data = {
    title: form.get('title'),
    subtitle: form.get('subtitle'),
    author: form.get('author'),
    content: form.get('content'),
    is_published: true,
    tags: []
  }

  await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })

  e.target.reset()
  loadArticles()
})

loadArticles()

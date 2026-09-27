// content.js - books and jobs content and renderers
const BP_BOOKS = [
  { id: 'b1', title: 'Black History Essentials', url: '#', desc: 'A free PDF covering key moments.' },
  { id: 'b2', title: 'Community Leadership Guide', url: '#', desc: 'Resources and activities for organizers.' }
];

const BP_JOBS = [
  { id: 'j1', title: 'Community Outreach Coordinator', company: 'Local Org', location: 'Remote / City', url: '#' },
  { id: 'j2', title: 'Merchandise Fulfillment Assistant', company: 'Black Power Shop', location: 'City', url: '#' }
];

function renderBooks(targetId='books-list'){
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = BP_BOOKS.map(b=>`<div><h4>${b.title}</h4><p class="muted">${b.desc}</p><p><a href="${b.url}" class="btn">Get</a></p></div>`).join('');
}

function renderJobs(targetId='jobs-list'){
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = BP_JOBS.map(j=>`<div><h4>${j.title}</h4><p class="muted">${j.company} — ${j.location}</p><p><a href="${j.url}" class="btn">Apply</a></p></div>`).join('');
}

document.addEventListener('DOMContentLoaded', ()=>{
  if (document.getElementById('books-list')) renderBooks();
  if (document.getElementById('jobs-list')) renderJobs();
});

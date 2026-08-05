-- TASKARA SEED DATA FOR LOCAL & TEST ENVIRONMENT

-- Seed Institutions (Campuses)
insert into public.institutions (id, name, slug, type, city, province, logo_url, is_verified) values
  ('b1111111-1111-1111-1111-111111111111', 'Universitas Indonesia', 'ui', 'university', 'Depok', 'Jawa Barat', 'https://api.dicebear.com/7.x/identicon/svg?seed=ui', true),
  ('b2222222-2222-2222-2222-222222222222', 'Institut Teknologi Bandung', 'itb', 'university', 'Bandung', 'Jawa Barat', 'https://api.dicebear.com/7.x/identicon/svg?seed=itb', true),
  ('b3333333-3333-3333-3333-333333333333', 'Universitas Gadjah Mada', 'ugm', 'university', 'Sleman', 'DI Yogyakarta', 'https://api.dicebear.com/7.x/identicon/svg?seed=ugm', true),
  ('b4444444-4444-4444-4444-444444444444', 'Institut Teknologi Sepuluh Nopember', 'its', 'polytechnic', 'Surabaya', 'Jawa Timur', 'https://api.dicebear.com/7.x/identicon/svg?seed=its', true),
  ('b5555555-5555-5555-5555-555555555555', 'Telkom University', 'telkom', 'university', 'Bandung', 'Jawa Barat', 'https://api.dicebear.com/7.x/identicon/svg?seed=telkom', true)
on conflict (slug) do nothing;

-- Seed Categories
insert into public.categories (id, name, slug, description, icon, sort_order) values
  ('c1111111-1111-1111-1111-111111111111', 'Web Development', 'web-development', 'Pembuatan website, landing page, dan aplikasi web modern', 'Globe', 1),
  ('c2222222-2222-2222-2222-222222222222', 'UI/UX Design', 'ui-ux-design', 'Desain tampilan antarmuka, wireframe, dan prototype Figma', 'Figma', 2),
  ('c3333333-3333-3333-3333-333333333333', 'Graphic Design', 'graphic-design', 'Logo, branding kit, poster, banner, dan materi promosi', 'Palette', 3),
  ('c4444444-4444-4444-4444-444444444444', 'Video Editing', 'video-editing', 'Editing video TikTok, Reels, YouTube, dan event recap', 'Video', 4),
  ('c5555555-5555-5555-5555-555555555555', 'Social Media Management', 'social-media', 'Pengelolaan konten, content planner, dan admin sosmed UMKM', 'Share2', 5),
  ('c6666666-6666-6666-6666-666666666666', 'Writing & Copywriting', 'writing', 'Artikel SEO, copywriting penawaran, transkripsi, dan narasi', 'FileText', 6),
  ('c7777777-7777-7777-7777-777777777777', 'Data Entry & Virtual Assistant', 'data-entry', 'Input data Excel, rekap inventaris, dan bantuan administrasi', 'Database', 7)
on conflict (slug) do nothing;

-- Seed Skills
insert into public.skills (id, name, slug, category_id) values
  ('s1111111-1111-1111-1111-111111111111', 'Next.js', 'nextjs', 'c1111111-1111-1111-1111-111111111111'),
  ('s2222222-2222-2222-2222-222222222222', 'React.js', 'reactjs', 'c1111111-1111-1111-1111-111111111111'),
  ('s3333333-3333-3333-3333-333333333333', 'Tailwind CSS', 'tailwindcss', 'c1111111-1111-1111-1111-111111111111'),
  ('s4444444-4444-4444-4444-444444444444', 'Figma', 'figma', 'c2222222-2222-2222-2222-222222222222'),
  ('s5555555-5555-5555-5555-555555555555', 'Adobe Illustrator', 'illustrator', 'c3333333-3333-3333-3333-333333333333'),
  ('s6666666-6666-6666-6666-666666666666', 'CapCut / Premiere', 'video-editing', 'c4444444-4444-4444-4444-444444444444'),
  ('s7777777-7777-7777-7777-777777777777', 'Copywriting', 'copywriting', 'c6666666-6666-6666-6666-666666666666'),
  ('s8888888-8888-8888-8888-888888888888', 'Microsoft Excel', 'excel', 'c7777777-7777-7777-7777-777777777777')
on conflict (slug) do nothing;

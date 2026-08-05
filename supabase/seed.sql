-- TASKARA SEED DATA FOR LOCAL & TEST ENVIRONMENT (VALID HEX UUIDs)

-- Seed Institutions (Campuses)
insert into public.institutions (id, name, slug, type, city, province, logo_url, is_verified) values
  ('11111111-1111-1111-1111-111111111111', 'Universitas Indonesia', 'ui', 'university', 'Depok', 'Jawa Barat', 'https://api.dicebear.com/7.x/identicon/svg?seed=ui', true),
  ('22222222-2222-2222-2222-222222222222', 'Institut Teknologi Bandung', 'itb', 'university', 'Bandung', 'Jawa Barat', 'https://api.dicebear.com/7.x/identicon/svg?seed=itb', true),
  ('33333333-3333-3333-3333-333333333333', 'Universitas Gadjah Mada', 'ugm', 'university', 'Sleman', 'DI Yogyakarta', 'https://api.dicebear.com/7.x/identicon/svg?seed=ugm', true),
  ('44444444-4444-4444-4444-444444444444', 'Institut Teknologi Sepuluh Nopember', 'its', 'polytechnic', 'Surabaya', 'Jawa Timur', 'https://api.dicebear.com/7.x/identicon/svg?seed=its', true)
on conflict (slug) do nothing;

-- Seed Categories
insert into public.categories (id, name, slug, description, icon, sort_order) values
  ('a1111111-1111-1111-1111-111111111111', 'Web Development', 'web-development', 'Pembuatan website, landing page, dan aplikasi web modern', 'Globe', 1),
  ('a2222222-2222-2222-2222-222222222222', 'UI/UX Design', 'ui-ux-design', 'Desain tampilan antarmuka, wireframe, dan prototype Figma', 'Figma', 2),
  ('a3333333-3333-3333-3333-333333333333', 'Graphic Design', 'graphic-design', 'Logo, branding kit, poster, banner, dan materi promosi', 'Palette', 3),
  ('a4444444-4444-4444-4444-444444444444', 'Video Editing', 'video-editing', 'Editing video TikTok, Reels, YouTube, dan event recap', 'Video', 4)
on conflict (slug) do nothing;

-- Seed Skills
insert into public.skills (id, name, slug, category_id) values
  ('b1111111-1111-1111-1111-111111111111', 'Next.js', 'nextjs', 'a1111111-1111-1111-1111-111111111111'),
  ('b2222222-2222-2222-2222-222222222222', 'Tailwind CSS', 'tailwindcss', 'a1111111-1111-1111-1111-111111111111'),
  ('b3333333-3333-3333-3333-333333333333', 'Figma Design', 'figma', 'a2222222-2222-2222-2222-222222222222'),
  ('b4444444-4444-4444-4444-444444444444', 'CapCut Pro / Premiere', 'video-editing', 'a4444444-4444-4444-4444-444444444444')
on conflict (slug) do nothing;

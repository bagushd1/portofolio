import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixArticleSlugs() {
  const { data: articles } = await supabase.from('articles').select('id, slug');
  
  if (articles) {
    for (const article of articles) {
      if (article.slug.startsWith('/')) {
        const newSlug = article.slug.replace(/^\/+/, '');
        await supabase.from('articles').update({ slug: newSlug }).eq('id', article.id);
        console.log(`Fixed slug for ${article.id}: ${article.slug} -> ${newSlug}`);
      }
    }
  }
}
fixArticleSlugs();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://izukztgoqnttoqeydtrs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6dWt6dGdvcW50dG9xZXlkdHJzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDM4NDIxMCwiZXhwIjoyMDQ5OTYwMjEwfQ.48wcPbggVyJz-EjGHQyTj0ZJUtxvKu1_GmOeMRkzFtI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;



import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://wpxfwhubfhjrjxuqtzss.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndweGZ3aHViZmhqcmp4dXF0enNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMDE2MDYsImV4cCI6MjA2NzU3NzYwNn0.Cf5UG6A4a9E6ht9o5AWuWdGgFCKci4qP2jH2v0CLFJQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

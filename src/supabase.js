import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://htlmdhpmeannusdqtfyf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bG1kaHBtZWFubnVzZHF0ZnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg5OTYxNjUsImV4cCI6MjAxNDU3MjE2NX0.PL0gW2FL0ctpq-W8VfE-MJ-OQimYXLIRCL_IT_IwizY');

export default supabase;

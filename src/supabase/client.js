import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wboqvrbhmpnahygpgmqg.supabase.co'
const supabaseAnonKey = 'sb_publishable_A7sr7T0B7jprffgZJ5mn5w_l5_Fnerh'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

//wboqvrbhmpnahygpgmqg
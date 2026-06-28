import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zbdwptlszlgdpurrqgic.supabase.co'
const supabaseAnonKey = 'sb_publishable_GGHK9NCWLpTM1mR2EUI12Q_yvCfMeDU'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)

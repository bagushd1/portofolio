'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { messageSchema } from '@/lib/validations/message'

/**
 * Mengirim pesan baru dari formulir kontak publik
 */
export async function sendMessage(data: { name: string; email: string; subject: string; message: string }) {
    const supabase = await createClient()

    // Validasi data
    const validation = messageSchema.safeParse(data)
    if (!validation.success) {
        return { error: validation.error.issues[0].message }
    }

    const { error } = await supabase.from('messages').insert({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
    })

    if (error) {
        return { error: 'Gagal mengirim pesan: ' + error.message }
    }

    revalidatePath('/admin/messages')
    return { success: true }
}

/**
 * Menghapus pesan (Admin)
 */
export async function deleteMessage(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('messages').delete().eq('id', id)

    if (error) {
        return { error: 'Gagal menghapus pesan: ' + error.message }
    }

    revalidatePath('/admin/messages')
    return { success: true }
}

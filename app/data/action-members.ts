'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from 'next/cache'

// CREATE
export async function createPost(formData: { hming: string; chhungte: string; mobile: string; chhungte_mobile: string; pianni: Date; veng: string; awm_tan_ni: Date; hnathawhna: string }) {
  const supabase = await createClient()
  const hming = formData.hming
  const chhungte = formData.chhungte
  const mobile = formData.mobile
  const chhungte_mobile = formData.chhungte_mobile
  const pianni = formData.pianni
  const veng = formData.veng
  const awm_tan_ni = formData.awm_tan_ni
  const hnathawhna = formData.hnathawhna
  const created_by = ""

  const { error } = await supabase
    .from('members')
    .insert([{ hming, chhungte, mobile, chhungte_mobile, pianni, veng, awm_tan_ni, hnathawhna, created_by }])

  if (error) throw new Error(error.message)
  
  revalidatePath('/')
}

// UPDATE
export async function updatePost(id: string, formData: { hming: string; chhungte: string; mobile: string; chhungte_mobile: string; pianni: string; veng: string; awm_tan_ni: string; hnathawhna: string }) {
  const supabase = await createClient()
  const hming = formData.hming
  const chhungte = formData.chhungte
  const mobile = formData.mobile
  const chhungte_mobile = formData.chhungte_mobile
  const pianni = formData.pianni
  const veng = formData.veng
  const awm_tan_ni = formData.awm_tan_ni
  const hnathawhna = formData.hnathawhna
  const created_by = ""

  const { error } = await supabase
    .from('members')
    .update({ hming, chhungte, mobile, chhungte_mobile, pianni, veng, awm_tan_ni, hnathawhna, created_by })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/')
}

// DELETE
export async function deletePost(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('members')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/')
}
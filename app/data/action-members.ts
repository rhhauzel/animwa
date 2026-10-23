'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from 'next/cache'

// CREATE
export async function createPost(formData: FormData) {
  const supabase = await createClient()
  const hming = formData.get('hming') as string
  const chhungte = formData.get('chhungte') as string
  const mobile = formData.get('mobile') as string
  const chhungte_mobile = formData.get('chhungte_mobile') as string
  const pianni = formData.get('pianni') as string
  const veng = formData.get('veng') as string
  const awm_tan_ni = formData.get('awm_tan_ni') as string
  const hnathawhna = formData.get('hnathawhna') as string
  const created_by = ""

  const { error } = await supabase
    .from('members')
    .insert([{ hming, chhungte, mobile, chhungte_mobile, pianni, veng, awm_tan_ni, hnathawhna, created_by }])

  if (error) throw new Error(error.message)
  
  revalidatePath('/')
}

// UPDATE
export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient()
  const hming = formData.get('hming') as string
  const chhungte = formData.get('chhungte') as string
  const mobile = formData.get('mobile') as string
  const chhungte_mobile = formData.get('chhungte_mobile') as string
  const pianni = formData.get('pianni') as string
  const veng = formData.get('veng') as string
  const awm_tan_ni = formData.get('awm_tan_ni') as string
  const hnathawhna = formData.get('hnathawhna') as string
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
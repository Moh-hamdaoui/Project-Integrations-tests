import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Register from '../../components/Register.vue'
import * as authService from '@/services/authService'

vi.mock('@/services/authService', () => ({
  registerUser: vi.fn()
}))

describe('Register.vue', () => {
  it('affiche un message après une inscription réussie', async () => {
    authService.registerUser.mockResolvedValue({ token: 'fake-token' })

    const wrapper = mount(Register)

    await wrapper.find('input[placeholder="Nom"]').setValue('Jean')
    await wrapper.find('input[placeholder="Email"]').setValue('jean@example.com')
    await wrapper.find('input[type="password"]').setValue('123456')
    await wrapper.find('form').trigger('submit.prevent')

    expect(authService.registerUser).toHaveBeenCalledWith({
      name: 'Jean',
      email: 'jean@example.com',
      password: '123456'
    })

    expect(wrapper.text()).toContain('Inscription réussie ! Token : fake-token')
  })

  it('affiche une erreur si l’inscription échoue', async () => {
    authService.registerUser.mockRejectedValue({
      response: { data: { message: 'Email déjà utilisé' } }
    })

    const wrapper = mount(Register)

    await wrapper.find('input[placeholder="Nom"]').setValue('Jean')
    await wrapper.find('input[placeholder="Email"]').setValue('jean@example.com')
    await wrapper.find('input[type="password"]').setValue('123456')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Email déjà utilisé')
  })
})

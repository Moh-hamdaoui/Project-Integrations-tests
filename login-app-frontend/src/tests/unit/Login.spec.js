import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Login from '../../components/Login.vue'
import * as authService from '@/services/authService'

vi.mock('@/services/authService', () => ({
  loginUser: vi.fn()
}))

describe('Login.vue', () => {
  it('affiche un message après une connexion réussie', async () => {
    authService.loginUser.mockResolvedValue({ token: 'fake-token' })

    const wrapper = mount(Login)

    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('123456')
    await wrapper.find('form').trigger('submit.prevent')

    expect(authService.loginUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123456'
    })

    expect(wrapper.text()).toContain('Connexion réussie ! Token : fake-token')
  })

  it('affiche un message d’erreur en cas d’échec', async () => {
    authService.loginUser.mockRejectedValue({
      response: { data: { message: 'Mauvais identifiants' } }
    })

    const wrapper = mount(Login)

    await wrapper.find('input[type="email"]').setValue('wrong@example.com')
    await wrapper.find('input[type="password"]').setValue('wrongpass')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Mauvais identifiants')
  })
})

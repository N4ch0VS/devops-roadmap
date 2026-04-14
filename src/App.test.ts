import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'

describe('App.vue', () => {
  it('renders the app title', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Guía de Estudio DevOps')
  })

  it('renders all 7 phases', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Fase 1: Fundamentos SO y Linux Avanzado')
    expect(wrapper.text()).toContain('Fase 2: Programación y Control de Versiones')
    expect(wrapper.text()).toContain('Fase 3: Contenedores y Kubernetes')
    expect(wrapper.text()).toContain('Fase 4: Infraestructura como Código (IaC)')
    expect(wrapper.text()).toContain('Fase 5: Tuberías CI/CD')
    expect(wrapper.text()).toContain('Fase 6: Observabilidad y Análisis de Fallos')
    expect(wrapper.text()).toContain('Fase 7: Arquitectura Global Nube (AWS)')
  })

  it('renders all navigation tabs', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Roadmap')
    expect(wrapper.text()).toContain('Rutina')
    expect(wrapper.text()).toContain('Calendario')
    expect(wrapper.text()).toContain('Recursos')
  })

  it('renders roadmap progress bar', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Progreso General')
    expect(wrapper.text()).toContain('0%')
  })
})

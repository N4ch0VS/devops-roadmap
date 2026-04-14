<script setup>
import { ref, computed } from 'vue'
import { 
  Terminal, Code, Box, FileCode, GitMerge, Activity, Cloud, 
  CheckCircle, Circle, Calendar as CalIcon, Map, LayoutList, 
  ChevronDown, ChevronUp, Clock, Target, BookOpen, MonitorPlay, 
  Wrench, Bookmark, ExternalLink
} from 'lucide-vue-next'

const phases = [
  { 
    id: 1, 
    title: 'Fase 1: Fundamentos SO y Linux Avanzado', 
    desc: 'Dominio de la terminal, gestión de procesos y redes.', 
    icon: Terminal,
    topics: ['Arranque y Entorno (Vim/Nano)', 'Gestión de Usuarios y Permisos (ACLs, sudoers)', 'Servicios con Systemd', 'Sistemas de Archivos (LVM, RAID)', 'Redes (nmcli) y SSH', 'Observabilidad (journald, logrotate)']
  },
  { 
    id: 2, 
    title: 'Fase 2: Programación y Control de Versiones', 
    desc: 'Automatización segura y fundamentos de software.', 
    icon: Code,
    topics: ['Python, Go o Bash avanzado', 'Estructuras de Datos y Complejidad (Big O)', 'Asincronía y APIs', 'Clean Code y Manejo de Errores', 'Git (Ramas, Fusiones, Conflictos)', 'Seguridad en Repositorios (No secretos)']
  },
  { 
    id: 3, 
    title: 'Fase 3: Contenedores y Kubernetes', 
    desc: 'Infraestructura inmutable y orquestación.', 
    icon: Box,
    topics: ['Arquitectura Docker y Dockerfiles', 'Docker Compose para multicontenedores', 'Arquitectura de Kubernetes', 'Pods, Namespaces, Deployments', 'Services, Ingress y Networking', 'ConfigMaps, Secrets y Helm']
  },
  { 
    id: 4, 
    title: 'Fase 4: Infraestructura como Código (IaC)', 
    desc: 'Aprovisionamiento y configuración desacoplada.', 
    icon: FileCode,
    topics: ['Terraform: Providers (AWS, GCP)', 'Terraform: Gestión de Estado (tfstate)', 'Terraform: Módulos', 'Ansible: Arquitectura sin agentes (SSH)', 'Ansible: Playbooks en YAML', 'Ansible: Idempotencia y Roles']
  },
  { 
    id: 5, 
    title: 'Fase 5: Tuberías CI/CD', 
    desc: 'Integración y entrega continua automatizada.', 
    icon: GitMerge,
    topics: ['Pirámide de Pruebas (Unitarias, Integración)', 'Jenkins: Arquitectura Maestro/Agente', 'Jenkins: Pipelines (Declarativo y Scripted)', 'GitHub Actions: Workflows y Jobs', 'Gestión de Secretos en CI/CD', 'Estrategias de Caché en compilación']
  },
  { 
    id: 6, 
    title: 'Fase 6: Observabilidad y Análisis de Fallos', 
    desc: 'Monitoreo proactivo y troubleshooting extremo.', 
    icon: Activity,
    topics: ['Gestión de Logs estructurados', 'Stack ELK o Grafana Loki', 'Métricas con Prometheus (Pull model)', 'Dashboards con Grafana', 'Troubleshooting en SadServers (Básico/Medio)', 'Resolución de incidentes simulados']
  },
  { 
    id: 7, 
    title: 'Fase 7: Arquitectura Global Nube (AWS)', 
    desc: 'Preparación para DOP-C02 Professional.', 
    icon: Cloud,
    topics: ['Automatización SDLC en AWS', 'Gestión de Config e IaC (CloudFormation/CDK)', 'Seguridad y Cumplimiento (DevSecOps)', 'Soluciones Resilientes en la Nube (HA)', 'Respuesta a Incidentes y EventBridge', 'Exámenes de práctica oficiales']
  }
]

const weeklyRoutine = [
  {
    day: 'Día 1',
    name: 'Teoría y Documentación',
    icon: BookOpen,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    desc: 'Asimilación documental y fundamentos.',
    tasks: [
      'Lectura de documentación oficial (Red Hat, AWS, etc.).',
      'Ingreso de PDFs y manuales en NotebookLM.',
      'Generación de resúmenes y cuestionarios con IA.',
      'Comprensión arquitectónica antes de teclear.'
    ]
  },
  {
    day: 'Día 2',
    name: 'Implementación Guiada',
    icon: MonitorPlay,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    desc: 'Práctica visual y memoria muscular en la terminal.',
    tasks: [
      'Consumo de tutoriales (ej. Pelado Nerd en YouTube).',
      'Reproducción simultánea de comandos en entorno local.',
      'Escritura de código (Dockerfiles, Terraform, scripts).',
      'Consulta de errores con NotebookLM y logs.'
    ]
  },
  {
    day: 'Día 3',
    name: 'Troubleshooting y Retos',
    icon: Wrench,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/20',
    desc: 'Resolución de problemas en entornos rotos.',
    tasks: [
      'Ingreso a plataformas de simulación (SadServers).',
      'Diagnóstico de redes, permisos o procesos.',
      'Aplicación del principio "Fail Fast" para aislar errores.',
      'Evaluación final de lo aprendido en la semana.'
    ]
  }
]

const resourcesData = [
  {
    category: "Cursos y Rutas de Aprendizaje",
    links: [
      { name: "Introduction to Linux (LFS101)", url: "https://share.google/Wj7j3dZB6JT9M63iw", desc: "Curso gratuito de la Linux Foundation. Fundamental para la Fase 1." },
      { name: "DevOps Roadmap (roadmap.sh)", url: "https://share.google/p5XM9wXMteKx3sbUL", desc: "La guía visual paso a paso estándar de la industria tecnológica." },
      { name: "AWS Certified DevOps Engineer", url: "https://share.google/yQYGb5WXSHyTvlWgh", desc: "Temario y preparación oficial para la certificación nivel Professional." }
    ]
  },
  {
    category: "Práctica y Laboratorios (Hands-on)",
    links: [
      { name: "SadServers - Linux & SRE Labs", url: "https://share.google/2MkXEvTgaleRrik3L", desc: "Entornos de Linux rotos. Ideal para tu Día 3 de Troubleshooting." },
      { name: "Killercoda", url: "https://killercoda.com/", desc: "Entornos interactivos directamente en el navegador para practicar Kubernetes y Linux sin instalar nada." }
    ]
  },
  {
    category: "Documentación Oficial",
    links: [
      { name: "Red Hat Documentation", url: "https://share.google/hRFFQYTDjvj1x2h6t", desc: "De libre acceso, oro puro para la administración de servidores Enterprise." },
      { name: "Kubernetes Docs (Español)", url: "https://kubernetes.io/es/docs/home/", desc: "Conceptos de orquestación explicados al detalle (Fase 3)." },
      { name: "Docker Docs", url: "https://docs.docker.com/", desc: "La biblia de la contenerización de aplicaciones." }
    ]
  },
  {
    category: "Canales de YouTube (En Español)",
    links: [
      { name: "Pelado Nerd", url: "https://youtube.com/@peladonerd", desc: "Canal por excelencia en español sobre Docker, Kubernetes, CI/CD y automatización." },
      { name: "Tech con Catalina", url: "https://www.youtube.com/@TechconCatalina", desc: "Excelentes explicaciones sobre conceptos de Cloud (AWS) y DevOps para principiantes." }
    ]
  }
]

const activeTab = ref('roadmap')
const completedPhases = ref([])
const expandedPhase = ref(1)
const calendarState = ref(Array.from({ length: 12 }, () => [false, false, false]))

const togglePhase = (id) => {
  if (completedPhases.value.includes(id)) {
    completedPhases.value = completedPhases.value.filter(p => p !== id)
  } else {
    completedPhases.value = [...completedPhases.value, id]
  }
}

const toggleDay = (weekIndex, dayIndex) => {
  const newCalendar = [...calendarState.value]
  newCalendar[weekIndex][dayIndex] = !newCalendar[weekIndex][dayIndex]
  calendarState.value = newCalendar
}

const totalSessions = 12 * 3
const completedSessions = computed(() => calendarState.value.flat().filter(Boolean).length)
const calendarProgress = computed(() => Math.round((completedSessions.value / totalSessions) * 100))
const roadmapProgress = computed(() => Math.round((completedPhases.value.length / phases.length) * 100))

const getIcon = (iconName) => {
  const icons = { Terminal, Code, Box, FileCode, GitMerge, Activity, Cloud, BookOpen, MonitorPlay, Wrench }
  return icons[iconName] || Terminal
}
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8">
    <div class="max-w-4xl mx-auto">
      <header class="mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2 tracking-tight">Guía de Estudio <span class="text-blue-500">DevOps</span></h1>
          <p class="text-slate-400">Programa independiente: 3 días/semana, 1 hora/día</p>
        </div>
        <div class="flex gap-4">
          <div class="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
            <Clock class="text-blue-400 w-6 h-6" />
            <div class="text-sm">
              <p class="text-slate-400">Compromiso</p>
              <p class="font-semibold text-white">3 Hrs / Sem</p>
            </div>
          </div>
        </div>
      </header>

      <nav class="flex flex-wrap gap-2 mb-8 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
        <button 
          @click="activeTab = 'roadmap'"
          :class="['flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all duration-200', activeTab === 'roadmap' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800']"
        >
          <Map class="w-4 h-4" /> Roadmap
        </button>
        <button 
          @click="activeTab = 'routine'"
          :class="['flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all duration-200', activeTab === 'routine' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800']"
        >
          <LayoutList class="w-4 h-4" /> Rutina
        </button>
        <button 
          @click="activeTab = 'calendar'"
          :class="['flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all duration-200', activeTab === 'calendar' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800']"
        >
          <CalIcon class="w-4 h-4" /> Calendario
        </button>
        <button 
          @click="activeTab = 'resources'"
          :class="['flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all duration-200', activeTab === 'resources' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800']"
        >
          <Bookmark class="w-4 h-4" /> Recursos
        </button>
      </nav>

      <main class="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <div v-if="activeTab === 'roadmap'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-white">Progreso General</h2>
            <span class="text-blue-400 font-bold">{{ roadmapProgress }}%</span>
          </div>
          <div class="w-full bg-slate-800 rounded-full h-2.5 mb-8 overflow-hidden">
            <div class="bg-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-out" :style="{ width: roadmapProgress + '%' }"></div>
          </div>

          <div class="space-y-4">
            <div 
              v-for="phase in phases" 
              :key="phase.id"
              :class="['border rounded-xl transition-colors duration-300', completedPhases.includes(phase.id) ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700']"
            >
              <div 
                class="p-4 flex items-center justify-between cursor-pointer"
                @click="expandedPhase = expandedPhase === phase.id ? null : phase.id"
              >
                <div class="flex items-center gap-4 flex-1">
                  <button 
                    @click.stop="togglePhase(phase.id)"
                    class="focus:outline-none"
                  >
                    <CheckCircle v-if="completedPhases.includes(phase.id)" class="w-7 h-7 text-emerald-500" />
                    <Circle v-else class="w-7 h-7 text-slate-600 hover:text-blue-400 transition-colors" />
                  </button>
                  <div class="flex items-center gap-3">
                    <div :class="['p-2 rounded-lg', completedPhases.includes(phase.id) ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-blue-400']">
                      <component :is="phase.icon" class="w-5 h-5" />
                    </div>
                    <div>
                      <h3 :class="['font-semibold', completedPhases.includes(phase.id) ? 'text-emerald-100 line-through opacity-70' : 'text-white']">{{ phase.title }}</h3>
                      <p class="text-sm text-slate-400 hidden md:block">{{ phase.desc }}</p>
                    </div>
                  </div>
                </div>
                <ChevronUp v-if="expandedPhase === phase.id" class="w-5 h-5 text-slate-500" />
                <ChevronDown v-else class="w-5 h-5 text-slate-500" />
              </div>

              <div v-if="expandedPhase === phase.id" class="px-14 pb-5 pt-2 border-t border-slate-800/50 text-sm text-slate-300">
                <p class="mb-4 text-slate-400 md:hidden">{{ phase.desc }}</p>
                <ul class="grid md:grid-cols-2 gap-2">
                  <li v-for="(topic, i) in phase.topics" :key="i" class="flex items-start gap-2">
                    <Target class="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                    <span>{{ topic }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'routine'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div class="mb-8">
            <h2 class="text-xl font-semibold text-white mb-2">Método de Estudio Optimizado</h2>
            <p class="text-slate-400 text-sm">
              Distribuye tu carga cognitiva. Nunca te saltes el Día 3; el diagnóstico de errores (troubleshooting) es la habilidad más valiosa de un ingeniero DevOps.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div 
              v-for="(day, i) in weeklyRoutine" 
              :key="i"
              :class="['rounded-2xl border p-6 relative overflow-hidden', day.border, day.bg]"
            >
              <div class="flex items-center gap-3 mb-4 relative z-10">
                <div :class="['p-2 rounded-lg bg-slate-950/50', day.color]">
                  <component :is="day.icon" class="w-6 h-6" />
                </div>
                <h3 class="font-bold text-lg text-white">{{ day.day }}</h3>
              </div>
              <h4 :class="['font-semibold mb-2', day.color]">{{ day.name }}</h4>
              <p class="text-sm text-slate-300 mb-4 h-10">{{ day.desc }}</p>
              
              <div class="space-y-2 relative z-10">
                <div 
                  v-for="(task, j) in day.tasks" 
                  :key="j"
                  class="flex gap-2 text-sm text-slate-400 bg-slate-950/30 p-2.5 rounded-lg border border-white/5"
                >
                  <span class="font-mono text-xs opacity-50 pt-0.5">{{ (j+1).toString().padStart(2, '0') }}</span>
                  <span>{{ task }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'calendar'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 class="text-xl font-semibold text-white mb-1">Rastreador de Sesiones (1er Trimestre)</h2>
              <p class="text-slate-400 text-sm">Haz clic en los bloques para marcar tus horas de estudio completadas.</p>
            </div>
            <div class="bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 flex items-center gap-3">
              <div class="text-right">
                <div class="text-sm text-slate-400">Progreso</div>
                <div class="font-bold text-blue-400">{{ completedSessions }} / {{ totalSessions }} Hrs</div>
              </div>
              <div class="w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center relative overflow-hidden">
                <div 
                  class="absolute inset-0 border-4 border-blue-500 rounded-full" 
                  :style="{ clipPath: `polygon(50% 50%, 50% 0, ${calendarProgress > 25 ? '100% 0' : '50% 0'}, ${calendarProgress > 50 ? '100% 100%' : '100% 50%'}, ${calendarProgress > 75 ? '0 100%' : '50% 100%'}, 0 50%)`, transform: `rotate(${calendarProgress * 3.6}deg)` }"
                ></div>
                <span class="text-xs font-bold relative z-10 text-white">{{ calendarProgress }}%</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div 
              v-for="(week, weekIndex) in calendarState" 
              :key="weekIndex"
              class="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 hover:border-blue-500/30 transition-colors"
            >
              <h3 class="text-sm font-semibold text-slate-300 mb-3 border-b border-slate-800 pb-2">Semana {{ weekIndex + 1 }}</h3>
              <div class="flex justify-between gap-2">
                <button
                  v-for="(isCompleted, dayIndex) in week"
                  :key="dayIndex"
                  @click="toggleDay(weekIndex, dayIndex)"
                  :class="['flex-1 flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all duration-200', isCompleted ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600']"
                  :title="`Marcar Día ${dayIndex + 1}`"
                >
                  <CheckCircle v-if="isCompleted" class="w-5 h-5 mb-1" />
                  <Circle v-else class="w-5 h-5 mb-1" />
                  <span class="text-xs font-medium">Día {{ dayIndex + 1 }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'resources'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div class="mb-8">
            <h2 class="text-xl font-semibold text-white mb-2">Fuentes y Enlaces Útiles</h2>
            <p class="text-slate-400 text-sm">
              Utiliza estos enlaces para documentar tus sesiones en NotebookLM. Haz clic en las tarjetas para abrir los recursos.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div 
              v-for="(section, idx) in resourcesData" 
              :key="idx"
              class="bg-slate-950/50 border border-slate-800 rounded-xl p-5"
            >
              <h3 class="font-bold text-blue-400 mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Bookmark class="w-4 h-4" />
                {{ section.category }}
              </h3>
              <div class="space-y-3">
                <a 
                  v-for="(link, linkIdx) in section.links"
                  :key="linkIdx"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block group bg-slate-900 border border-slate-800 hover:border-blue-500/50 p-4 rounded-lg transition-all"
                >
                  <div class="flex justify-between items-start mb-1">
                    <h4 class="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {{ link.name }}
                    </h4>
                    <ExternalLink class="w-4 h-4 text-slate-500 group-hover:text-blue-400 shrink-0 ml-2" />
                  </div>
                  <p class="text-sm text-slate-400 leading-relaxed">
                    {{ link.desc }}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

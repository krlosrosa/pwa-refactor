import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import { ListaDemandaView } from './presentation/devolucao/views/lista-demanda.view.tsx'
import { ChecklistPage } from './presentation/devolucao/views/check-list.view.tsx'
import { ConferenceView } from './presentation/devolucao/views/conferencia.view.tsx'
import { ConferenceItemView } from './presentation/devolucao/views/conference-item.view.tsx'
import { ConferenceItemExtraView } from './presentation/devolucao/views/conference-item-extra.view.tsx'
import { AddAnomaliaView } from './presentation/devolucao/views/addAnomalia.view.tsx'
import { FinishDemandaView } from './presentation/devolucao/views/finishDemanda.view.tsx'
import { AuthProvider } from './presentation/user/authProvider.tsx'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { StartDemandaView } from './presentation/devolucao/views/startDemanda.view.tsx'
import { ProviderSync } from './presentation/devolucao/providerSync.tsx'
import SyncDashboard from './presentation/devolucao/views/sync-data-dashboard.view.tsx'


const rootRoute = createRootRoute({
  component: () =>     <>
  <Outlet />
  <TanStackRouterDevtools />
</>
})


const listaDemandaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/retorno-devolucao/lista',
  component: ListaDemandaView,
})

const validateDemandRoute = createRoute({
  getParentRoute: () => rootRoute,  
  path: '/demands/$id',
  component:  ConferenceView,
})            

const startDemandRoute = createRoute({
  getParentRoute: () => rootRoute,  
  path: '/demands/$id/start',
  component:  StartDemandaView,
})

const checklistRoute = createRoute({
  getParentRoute: () => rootRoute,  
  path: '/demands/$id/checklist',
  component:  ChecklistPage,
})              

const itemConferenceRoute = createRoute({
  getParentRoute: () => rootRoute,  
  path: '/demands/$id/items/$itemId/conference',
  component: ConferenceItemView,
})

const demandFinishRoute = createRoute({
  getParentRoute: () => rootRoute,  
  path: '/demands/$id/finish',
  component:  FinishDemandaView,
})

const anomalyRegistrationRoute = createRoute({
  getParentRoute: () => rootRoute,  
  path: '/demands/$id/items/$itemId/anomaly-registration',
  component:  AddAnomaliaView,
})

const addExtraItemRoute = createRoute({
  getParentRoute: () => rootRoute,  
  path: '/demands/$id/items/add-extra',
  component:  ConferenceItemExtraView,
})

const syncDataDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,  
  path: '/sync-data-dashboard',
  component:  SyncDashboard,
})

const routeTree = rootRoute.addChildren(
  [
    syncDataDashboardRoute,
    validateDemandRoute,
    startDemandRoute,
    checklistRoute,
    itemConferenceRoute,
    demandFinishRoute,
    anomalyRegistrationRoute,
    addExtraItemRoute,
    listaDemandaRoute,
  ] as const
)

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})



declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <AuthProvider>
        <ProviderSync/>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  )
}

reportWebVitals()

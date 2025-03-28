import { FC, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppRouter } from '@app/appRouter'
import { MainLayout } from '@app/layouts/MainLayout'
import { AuthPage } from '@pages/auth'
import { CreatePage } from '@pages/add'

export const RouterProvider: FC = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* without MainLayout */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/create" element={<CreatePage />} />
        {/* with MainLayout */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <AppRouter />
            </MainLayout>
          }
        />
      </Routes>
    </Suspense>
  </BrowserRouter>
)

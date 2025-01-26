import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: (RenderMode as any).SSR, // Dynamically render all routes
  },
];

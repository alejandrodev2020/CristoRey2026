import { FuseNavigationItem } from "@fuse/components/navigation";

export  const rolesSeller: FuseNavigationItem[] = [
    {
        'icon': 'heroicons_outline:template',
        'id': 'example',
        'link':'/home',
        'title':'Inicio',
        'type':'basic'
    },
    {
        'icon': 'heroicons_outline:shopping-cart',
        'id': 'example',
        'link':'/sale',
        'title':'Ventas',
        'type':'basic'
    },
    {
        'icon': 'mat_solid:tag',
        'id': 'example',
        'link':'/product',
        'title':'Productos',
        'type':'basic'
    },
    {
        'icon': 'heroicons_outline:credit-card',
        'id': 'example',
        'link':'/charges',
        'title':'Cobros',
        'type':'basic'
    },
  
    {
        'icon': 'heroicons_outline:user-group',
        'id': 'example',
        'link':'/client',
        'title':'Clientes',
        'type':'basic'
    },
    {
        'icon': 'feather:settings',
        'id': 'example',
        'link':'/configuration',
        'title':'Configuración',
        'type':'basic'
    },
    {
        'icon': 'heroicons_outline:logout',
        'id': 'example',
        'link':'/auth',
        'title':'Cerrar Sesión',
        'type':'basic'
    },
];
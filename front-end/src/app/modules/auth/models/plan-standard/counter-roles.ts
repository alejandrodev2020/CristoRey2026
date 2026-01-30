import { FuseNavigationItem } from "@fuse/components/navigation";

export  const rolesCounter: FuseNavigationItem[] = [
    {
        'icon': 'heroicons_outline:template',
        'id': 'example',
        'link':'/home',
        'title':'Inicio',
        'type':'basic'
    },
    {
        'icon': 'heroicons_outline:cash',
        'id': 'example',
        'link':'/petty-cash',
        'title':'Caja',
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
        'icon': 'heroicons_outline:finger-print',
        'id': 'example',
        'link':'/security',
        'title':'Seguridad',
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
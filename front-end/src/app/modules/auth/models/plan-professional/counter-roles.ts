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
        'icon': 'heroicons_outline:logout',
        'id': 'example',
        'link':'/auth',
        'title':'Cerrar Sesión',
        'type':'basic'
    },
];
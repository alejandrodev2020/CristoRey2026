import { FuseNavigationItem } from "@fuse/components/navigation";
const conaa : FuseNavigationItem = {
    'icon': 'mat_solid:business',
    'id': 'example',
    'link':'/warehouse',
    'title':'Almacenes',
    'type':'basic',
}
export  const rolesAdmin: FuseNavigationItem[] = [
    {
        'icon': 'heroicons_outline:template',
        'id': 'example',
        'link':'/home',
        'title':'Inicio',
        'type':'basic'
    },
    {
        'icon': 'heroicons_outline:user-group',
        'id': 'example',
        'link':'/patient',
        'title':'Pacientes',
        'type':'basic'
    },
    // {
    //     'icon': 'heroicons_outline:calendar',
    //     'id': 'example',
    //     'link':'/calendar',
    //     'title':'Mi Agenda',
    //     'type':'basic'
    // },
    {
        'icon': 'mat_solid:tag',
        'id': 'example',
        'link':'/options',
        'title':'Opciones',
        'type':'basic'
    },
    {
        'icon': 'heroicons_outline:user-group',
        'id': 'example',
        'link':'/doctors',
        'title':'Doctores',
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
        'icon': 'heroicons_outline:document-report',
        'id': 'example',
        'link':'/report',
        'title':'Solicitudes',
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

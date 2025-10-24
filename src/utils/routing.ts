export function getBackgroundLocationForModalRoute(pathname: string): Location {
    if (pathname.startsWith('/profile/orders/')) {
        return { pathname: '/profile/orders', search: '', hash: '', state: null, key: 'default' } as unknown as Location;
    } else if (pathname.startsWith('/feed/')) {
        return { pathname: '/feed', search: '', hash: '', state: null, key: 'default' } as unknown as Location;
    } else if (pathname.startsWith('/ingredients/')) {
        return { pathname: '/', search: '', hash: '', state: null, key: 'default' } as unknown as Location;
    }
    return { pathname: '/', search: '', hash: '', state: null, key: 'default' } as unknown as Location;
}
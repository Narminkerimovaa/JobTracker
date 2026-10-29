import { Menu } from 'antd'
import type { MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function Header() {
    const items: MenuItem[] = [
        { key: '/', label: <Link to='/'>Yeni müraciət</Link> },
        { key: '/panel', label: <Link to='/panel'>Panel</Link> },]

    const { pathname } = useLocation()

    return (
        <Menu
            items={items}
            selectedKeys={[pathname]}
            mode="horizontal"
            theme="dark"
        >
        </Menu>
    )
}

export default Header
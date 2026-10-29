import { Menu, Layout, theme, Switch } from 'antd'
import type { MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore';

type MenuItem = Required<MenuProps>['items'][number];

function Header() {
    const items: MenuItem[] = [
        { key: '/', label: <Link to='/'>Yeni müraciət</Link> },
        { key: '/panel', label: <Link to='/panel'>Panel</Link> },]

    const { pathname } = useLocation()
    const { token } = theme.useToken()
    const { isDark, toggle } = useThemeStore()

    return (
        <Layout.Header style={{backgroundColor: token.colorBgContainer, display: 'flex', alignItems: 'center', gap: 24}}>
           <h1 style={{color:token.colorPrimary, fontWeight: 700, fontSize: 18}}>JobTrack</h1>
           <Menu
            items={items}
            selectedKeys={[pathname]}
            mode="horizontal"
            style={{ flex: 1, minWidth: 0 }}
        >
        </Menu> 
        <Switch
        checked={isDark}
        onChange={toggle}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      /> 
        </Layout.Header>
       
    )
}

export default Header
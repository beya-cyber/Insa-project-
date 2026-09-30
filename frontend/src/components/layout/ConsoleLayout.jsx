import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function ConsoleLayout() {
  return (
    <div className="console-shell flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  )
}

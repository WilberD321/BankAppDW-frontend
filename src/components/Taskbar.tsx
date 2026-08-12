import { NavLink } from "react-router";

export function Taskbar() {
  return (
    <header className="taskbar">
      <span className="taskbar-brand">BankAppDW</span>
      <nav className="taskbar-nav">
        <NavLink to="/" end>
          Customers
        </NavLink>
        <NavLink to="/accounts">All accounts</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
      </nav>
    </header>
  );
}

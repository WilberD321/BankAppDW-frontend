import { useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ChangePasswordForm } from "./ChangePasswordForm";

export function PortalNav() {
  const { session, logout } = useAuth();
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  return (
    <>
      <header className="taskbar">
        <span className="taskbar-brand">BankAppDW</span>
        <nav className="taskbar-nav">
          <NavLink to="/" end>
            My accounts
          </NavLink>
          <NavLink to="/transactions">Transactions</NavLink>
        </nav>
        <div className="nav-user">
          <span>{session?.username}</span>
          <button
            type="button"
            className="button-secondary button-sm"
            onClick={() => setIsChangingPassword((current) => !current)}
          >
            {isChangingPassword ? "Cancel" : "Change password"}
          </button>
          <button type="button" className="button-secondary button-sm" onClick={logout}>
            Log out
          </button>
        </div>
      </header>
      {isChangingPassword && (
        <div className="inline-panel change-password-panel">
          <ChangePasswordForm onSuccess={() => setIsChangingPassword(false)} />
        </div>
      )}
    </>
  );
}

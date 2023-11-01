import AuthHeader from "../components/Header/AuthHeader";

// eslint-disable-next-line react/prop-types
function AuthLayout({ children }) {
  return (
    <div>
      <AuthHeader />
      {children}
    </div>
  );
}

export default AuthLayout;

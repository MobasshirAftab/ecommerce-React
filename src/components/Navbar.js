import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

function Navbar() {
 
  const cartItems = useSelector(state => state.cart.cart);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary border-bottom border-body">
        <div className="container-fluid d-flex">
          <Link to="/" className="navbar-brand" href="#">
            <h1>ShopKart</h1>
          </Link>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {/* <Link className="nav-link mx-2" href="#">
                <h4>Add a Product </h4>
              </Link> */}
              <Link to="/checkout" className="nav-link mx-2" href="#">
                <h4>Cart</h4>
              </Link>{" "}
              <button disabled={true} className="btn btn-danger">
                {cartItems.length}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default Navbar;

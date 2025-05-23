import { Head } from "@inertiajs/react";
import '@/assets/css/vendor/bootstrap.min.css'
import '@/assets/css/vendor/material-icons.css'
import '@/assets/css/vendor/jquery-ui.min.css'
import '@/assets/css/plugins/animate.css'
import '@/assets/css/plugins/nice-select.css'
import '@/assets/css/plugins/swiper-bundle.min.css'
import '@/assets/css/plugins/ion.rangeSlider.min.css'
import '@/assets/css/plugins/venobox.min.css'
import '@/assets/css/style.css'
import '@/assets/js/vendor/modernizr-3.11.2.min.js'
import '@/assets/js/vendor/jquery-3.6.0.min.js'
import '@/assets/js/vendor/jquery-migrate-3.3.2.min.js'
import '@/assets/js/vendor/bootstrap.bundle.min.js'
import '@/assets/js/vendor/jquery-ui.min.js'
import '@/assets/js/plugins/jquery.nice-select.js'
import '@/assets/js/plugins/swiper-bundle.min.js'
import '@/assets/js/plugins/ion.rangeSlider.min.js'
import '@/assets/js/plugins/venobox.min.js'
import '@/assets/js/plugins/ajax-mail.js'
import '@/assets/js/main.js'

export default function StorePage() {
    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
            </Head>
            <div>
                <header className="header-section pos-absolute dark-bg sticky-header d-none d-lg-block section-fluid-270">
                    <div className="header-wrapper pos-relative">
                        <div className="container-fluid">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-auto">
                                    <a href="index.html" className="header-logo">
                                        <img className="img-fluid" src="assets/images/logo/logo-dark-theme.png" alt="" />
                                    </a>
                                </div>
                                <div className="col-auto d-flex align-items-center">
                                    <div className="header-event">
                                        <div className="menu-event dropdown">
                                            <button className="main-menu-event dropdown-toggle" data-bs-toggle="dropdown"><img src="assets/images/icons/icon-open-menu.svg" alt="" /><span>Menu</span><img src="assets/images/icons/icon-arrow-drop-down.svg" alt="" /></button>
                                            <ul className="mainmenu-nav dropdown-menu">
                                                <li className="menu-items">
                                                    <a href="index.html">Home <span className="material-icons">arrow_right</span></a>
                                                    <div className="has-dropdown">
                                                        <div className="menu-content">
                                                            <h6 className="title">Home Page</h6>
                                                            <ul className="submenu">
                                                                <li><a href="index.html">Home 1</a></li>
                                                                <li><a href="index-2.html">Home 2</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="menu-items">
                                                    <a href="shop-grid-sidebar-left.html">Shop <span className="material-icons">arrow_right</span></a>
                                                    <div className="has-dropdown megamenu">
                                                        <div className="menu-content">
                                                            <h6 className="title">Shop Page</h6>
                                                            <ul className="submenu">
                                                                <li><a href="shop-grid-sidebar-left.html">Left Sidebar</a></li>
                                                                <li><a href="shop-grid-sidebar-right.html">Right Sidebar</a></li>
                                                                <li><a href="shop-grid-sidebar-full-width-3-column.html">Shop Full Width</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="menu-content">
                                                            <h6 className="title">Product Details Page</h6>
                                                            <ul className="submenu">
                                                                <li><a href="product-details-default.html">Product Default</a></li>
                                                                <li><a href="product-details-group.html">Product Group</a></li>
                                                                <li><a href="product-details-left-sidebar.html">Product Left Sidebar</a></li>
                                                                <li><a href="product-details-right-sidebar.html">Product Right Sidebar</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="menu-content">
                                                            <h6 className="title">Others Page</h6>
                                                            <ul className="submenu">
                                                                <li><a href="cart.html">Cart</a></li>
                                                                <li><a href="wishlist.html">Wishlist</a></li>
                                                                <li><a href="compare.html">Compare</a></li>
                                                                <li><a href="checkout.html">Checkout</a></li>
                                                                <li><a href="login.html">Login</a></li>
                                                                <li><a href="my-account.html">MyAccount</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="menu-items">
                                                    <a href="blog-list-left-sidebar.html">Blog <span className="material-icons">arrow_right</span></a>
                                                    <div className="has-dropdown megamenu">
                                                        <div className="menu-content">
                                                            <h6 className="title">Blog List Full Width</h6>
                                                            <ul className="submenu">
                                                                <li><a href="blog-list-3-grid-full-width.html">Grid 3 Full Width</a></li>
                                                                <li><a href="blog-list-4-grid-full-width.html">Grid 4 Full Width</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="menu-content">
                                                            <h6 className="title">Blog List Sidebar</h6>
                                                            <ul className="submenu">
                                                                <li><a href="blog-list-left-sidebar.html">Left Sidebar</a></li>
                                                                <li><a href="blog-list-right-sidebar.html">Right Sidebar</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="menu-content">
                                                            <h6 className="title">Blog Details</h6>
                                                            <ul className="submenu">
                                                                <li><a href="blog-details-full-width.html">Full Width</a></li>
                                                                <li><a href="blog-details-left-sidebar.html">Left Sidebar</a></li>
                                                                <li><a href="blog-details-right-sidebar.html">Right Sidebar</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="menu-items">
                                                    <a href="#">Pages <span className="material-icons">arrow_right</span></a>
                                                    <div className="has-dropdown">
                                                        <div className="menu-content">
                                                            <h6 className="title">Inner Pages</h6>
                                                            <ul className="submenu">
                                                                <li><a href="about.html">About Us</a></li>
                                                                <li><a href="faq.html">FAQ</a></li>
                                                                <li><a href="error.html">404-Error</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="menu-items"><a href="contact.html">Contact Us</a></li>
                                            </ul>
                                        </div>
                                        <div className="search-event">
                                            <input className="header-search" type="search" placeholder="Search" />
                                            <button className="header-search-btn" type="submit"><img src="assets/images/icons/icon-search.svg" alt="" /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="header-action">
                                        <button className="header-action-item header-action-wishlist" data-bs-toggle="offcanvas" data-bs-target="#wishlistOffcanvas"><img src="assets/images/icons/icon-heart-light.svg" alt="" /><span className="count-tag">01</span></button>
                                        <button className="header-action-item header-action-wishlist" data-bs-toggle="offcanvas" data-bs-target="#addcartOffcanvas"><img src="assets/images/icons/icon-shopping-bag-light.svg" alt="" /><span className="item-count item-count--dark">02 ITEMS</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </header>

                <div className="mobile-header d-block d-lg-none">
                    <div className="container-fluid">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-auto">
                                <div className="mobile-logo">
                                    <a href="index.html"><img src="assets/images/logo/logo-light-theme.png" alt="" /></a>
                                </div>
                            </div>

                            <div className="col-auto">
                                <div className="mobile-action-link text-end d-flex ">
                                    <button data-bs-toggle="offcanvas" data-bs-target="#toggleMenu"><span className="material-icons">menu</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="offcanvas offcanvas-start" tabIndex={-1} id="toggleMenu">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="d-flex justify-content-center ">
                            <a href="wishlist.html" className="header-action-item header-action-wishlist"><img src="assets/images/icons/icon-heart-dark.svg" alt="" /><span className="count-tag">01</span></a>
                            <a href="cart.html" className="header-action-item header-action-wishlist"><img src="assets/images/icons/icon-shopping-bag-dark.svg" alt="" /><span className="item-count item-count--light">02 ITEMS</span></a>
                        </div>

                        <div className="header-event mobile-search my-5">
                            <div className="search-event">
                                <input className="header-search" type="search" />
                                <button className="header-search-btn" type="submit"><img src="assets/images/icons/icon-search.svg" alt="" /></button>
                            </div>
                        </div>

                        <div className="offcanvas-mobile-menu-wrapper">
                            <div className="mobile-menu-bottom">
                                <div className="offcanvas-menu">
                                    <ul>
                                        <li>
                                            <a href="#"><span>Home</span></a>
                                            <ul className="mobile-sub-menu">
                                                <li><a href="index.html">Home 1</a></li>
                                                <li><a href="index-2.html">Home 2</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#"><span>Shop</span></a>
                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    <a href="#">Shop Page</a>
                                                    <ul className="mobile-sub-menu">
                                                        <li><a href="shop-grid-sidebar-left.html">Left Sidebar</a></li>
                                                        <li><a href="shop-grid-sidebar-right.html">Right Sidebar</a></li>
                                                        <li><a href="shop-grid-sidebar-full-width-3-column.html">Shop Full Width</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    <a href="#">Product Page</a>
                                                    <ul className="mobile-sub-menu">
                                                        <li><a href="product-details-default.html">Product Default</a></li>
                                                        <li><a href="product-details-group.html">Product Group</a></li>
                                                        <li><a href="product-details-left-sidebar.html">Product Left Sidebar</a></li>
                                                        <li><a href="product-details-right-sidebar.html">Product Right Sidebar</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    <a href="#">Others Page</a>
                                                    <ul className="mobile-sub-menu">
                                                        <li><a href="cart.html">Cart</a></li>
                                                        <li><a href="wishlist.html">Wishlist</a></li>
                                                        <li><a href="compare.html">Compare</a></li>
                                                        <li><a href="checkout.html">Checkout</a></li>
                                                        <li><a href="login.html">Login</a></li>
                                                        <li><a href="my-account.html">MyAccount</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#"><span>Blogs</span></a>
                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    <a href="#">Blog List</a>
                                                    <ul className="mobile-sub-menu">
                                                        <li><a href="blog-list-3-grid-full-width.html">Grid 3 Full Width</a></li>
                                                        <li><a href="blog-list-4-grid-full-width.html">Grid 4 Full Width</a></li>
                                                        <li><a href="blog-list-left-sidebar.html">Left Sidebar</a></li>
                                                        <li><a href="blog-list-right-sidebar.html">Right Sidebar</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    <a href="#">Blog Details</a>
                                                    <ul className="mobile-sub-menu">
                                                        <li><a href="blog-details-left-sidebar.html">Left Sidebar</a></li>
                                                        <li><a href="blog-details-right-sidebar.html">Right Sidebar</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#"><span>Pages</span></a>
                                            <ul className="mobile-sub-menu">
                                                <li><a href="about.html"><span>About Us</span></a></li>
                                                <li><a href="faq.html">FAQ</a></li>
                                                <li><a href="error.html">404 Page</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="contact.html"><span>Contact</span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mobile-contact-info text-center">
                                <ul className="social-link">
                                    <li><a href="https://www.facebook.com/" target="_blank" rel="noopener"><img className="icon-svg" src="assets/images/icons/icon-facebook-f-dark.svg" alt="" /></a>
                                    </li>
                                    <li><a href="https://twitter.com/" target="_blank" rel="noopener"><img className="icon-svg" src="assets/images/icons/icon-twitter-dark.svg" alt="" /></a>
                                    </li>
                                    <li><a href="https://www.pinterest.com/" target="_blank" rel="noopener"><img className="icon-svg" src="assets/images/icons/icon-pinterest-p-dark.svg" alt="" /></a></li>
                                    <li><a href="https://dribbble.com/" target="_blank" rel="noopener"><img className="icon-svg" src="assets/images/icons/icon-dribbble-dark.svg" alt="" /></a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="offcanvas offcanvas-end" tabIndex={-1} id="wishlistOffcanvas">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title">Wishlist</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="offcanvas-products-list">
                            <li className="single-item">
                                <div className="box">
                                    <a href="" className="image">
                                        <img src="assets/images/products/small/product-small-1.webp" alt="" className="offcanvas-wishlist-image" />
                                    </a>
                                    <div className="content">
                                        <a href="" className="title">Tops</a>
                                        <div className="offcanvas-wishlist-item-details">
                                            <span className="offcanvas-wishlist-item-details-quantity">1 x </span>
                                            <span className="offcanvas-wishlist-item-details-price">$100.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-delete text-right">
                                    <a href="#"><img src="assets/images/icons/icon-trash.svg" alt="" /></a>
                                </div>
                            </li>
                            <li className="single-item">
                                <div className="box">
                                    <a href="" className="image">
                                        <img src="assets/images/products/small/product-small-2.webp" alt="" className="offcanvas-wishlist-image" />
                                    </a>
                                    <div className="content">
                                        <a href="" className="title">Leggings</a>
                                        <div className="offcanvas-wishlist-item-details">
                                            <span className="offcanvas-wishlist-item-details-quantity">1 x </span>
                                            <span className="offcanvas-wishlist-item-details-price">$49.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-delete text-right">
                                    <a href="#"><img src="assets/images/icons/icon-trash.svg" alt="" /></a>
                                </div>
                            </li>
                            <li className="single-item">
                                <div className="box">
                                    <a href="" className="image">
                                        <img src="assets/images/products/small/product-small-3.webp" alt="" className="offcanvas-wishlist-image" />
                                    </a>
                                    <div className="content">
                                        <a href="" className="title">Casual Shirt</a>
                                        <div className="offcanvas-wishlist-item-details">
                                            <span className="offcanvas-wishlist-item-details-quantity">1 x </span>
                                            <span className="offcanvas-wishlist-item-details-price">$65.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-delete text-right">
                                    <a href="#"><img src="assets/images/icons/icon-trash.svg" alt="" /></a>
                                </div>
                            </li>
                        </ul>
                        <div className="offcanvas-action-link">
                            <a href="wishlist.html" className="btn">View wishlist</a>
                        </div>
                    </div>
                </div>

                <div className="offcanvas offcanvas-end" tabIndex={-1} id="addcartOffcanvas">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title">Add Cart</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="offcanvas-products-list">
                            <li className="single-item">
                                <div className="box">
                                    <a href="" className="image">
                                        <img src="assets/images/products/small/product-small-1.webp" alt="" className="offcanvas-wishlist-image" />
                                    </a>
                                    <div className="content">
                                        <a href="" className="title">Tops</a>
                                        <div className="offcanvas-wishlist-item-details">
                                            <span className="offcanvas-wishlist-item-details-quantity">1 x </span>
                                            <span className="offcanvas-wishlist-item-details-price">$100.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-delete text-right">
                                    <a href="#"><img src="assets/images/icons/icon-trash.svg" alt="" /></a>
                                </div>
                            </li>
                            <li className="single-item">
                                <div className="box">
                                    <a href="" className="image">
                                        <img src="assets/images/products/small/product-small-2.webp" alt="" className="offcanvas-wishlist-image" />
                                    </a>
                                    <div className="content">
                                        <a href="" className="title">Leggings</a>
                                        <div className="offcanvas-wishlist-item-details">
                                            <span className="offcanvas-wishlist-item-details-quantity">1 x </span>
                                            <span className="offcanvas-wishlist-item-details-price">$49.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-delete text-right">
                                    <a href="#"><img src="assets/images/icons/icon-trash.svg" alt="" /></a>
                                </div>
                            </li>
                            <li className="single-item">
                                <div className="box">
                                    <a href="" className="image">
                                        <img src="assets/images/products/small/product-small-3.webp" alt="" className="offcanvas-wishlist-image" />
                                    </a>
                                    <div className="content">
                                        <a href="" className="title">Casual Shirt</a>
                                        <div className="offcanvas-wishlist-item-details">
                                            <span className="offcanvas-wishlist-item-details-quantity">1 x </span>
                                            <span className="offcanvas-wishlist-item-details-price">$65.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-delete text-right">
                                    <a href="#"><img src="assets/images/icons/icon-trash.svg" alt="" /></a>
                                </div>
                            </li>
                        </ul>
                        <div className="offcanvas-action-link">
                            <a href="cart.html" className="btn">Add Cart</a>
                            <a href="checkout.html" className="btn">Checkout</a>
                        </div>
                    </div>
                </div>

                <div className="breadcrumb-section">
                    <div className="box-wrapper">
                        <div className="breadcrumb-wrapper breadcrumb-wrapper--style-1 pos-relative">
                            <div className="breadcrumb-bg">
                                <img src="assets/images/breadcrumb/breadcrumb-img-shop-page.webp" alt="" />
                            </div>
                            <div className="breadcrumb-content section-fluid-270">
                                <div className="breadcrumb-wrapper">
                                    <div className="content">
                                        <span className="title-tag">BEST DEAL FOREVER</span>
                                        <h2 className="title"><span className="text-mark">Hurry!</span> <br /> Get your product now</h2>
                                    </div>
                                    <ul className="breadcrumb-nav">
                                        <li><a href="shop-grid-sidebar-left.html">Shop</a></li>
                                        <li> Shop Page Left Sidebar</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shop-list-section section-fluid-270 section-top-gap-100">
                    <div className="box-wrapper">
                        <div className="shop-list-wrapper">
                            <div className="container-fluid">
                                <div className="row flex-column-reverse flex-lg-row">
                                    <div className="col-xl-3 col-lg-3">
                                        <div className="siderbar-section">
                                            <div className="sidebar-single-widget">
                                                <h6 className="sidebar-title title-border title-border">Categories</h6>
                                                <div className="sidebar-content">
                                                    <div className="filter-type-select">
                                                        <ul>
                                                            <li>
                                                                <label className="checkbox-default" htmlFor="men">
                                                                    <input type="checkbox" id="men" />
                                                                    <span>Men</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="checkbox-default" htmlFor="women">
                                                                    <input type="checkbox" id="women" />
                                                                    <span>Women</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="checkbox-default" htmlFor="kid">
                                                                    <input type="checkbox" id="kid" />
                                                                    <span>Kid</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="checkbox-default" htmlFor="fashion">
                                                                    <input type="checkbox" id="fashion" />
                                                                    <span>Fashion</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="checkbox-default" htmlFor="new-arrival">
                                                                    <input type="checkbox" id="new-arrival" />
                                                                    <span>New Arrival</span>
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="sidebar-single-widget">
                                                <h6 className="sidebar-title title-border">Color</h6>
                                                <div className="sidebar-content">
                                                    <div className="filter-type-select">
                                                        <ul>
                                                            <li>
                                                                <label className="checkbox-default" htmlFor="red">
                                                                    <input type="checkbox" id="red" />
                                                                    <span>Red</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="checkbox-default" htmlFor="green">
                                                                    <input type="checkbox" id="green" />
                                                                    <span>Green</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="checkbox-default" htmlFor="blue">
                                                                    <input type="checkbox" id="blue" />
                                                                    <span>Blue</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="checkbox-default" htmlFor="black">
                                                                    <input type="checkbox" id="black" />
                                                                    <span>Black</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="checkbox-default" htmlFor="pink">
                                                                    <input type="checkbox" id="pink" />
                                                                    <span>Pink</span>
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="sidebar-single-widget">
                                                <h6 className="sidebar-title title-border">FILTER BY PRICE</h6>
                                                <div className="sidebar-content">
                                                    <input type="text" className="js-range-slider" name="my_range" value="" data-type="double" data-min="0" data-max="7000" data-from="500" data-to="5000" />
                                                </div>
                                            </div>

                                            <div className="sidebar-single-widget">
                                                <h6 className="sidebar-title title-border">Material</h6>
                                                <div className="sidebar-content">
                                                    <div className="filter-type-select">
                                                        <ul>
                                                            <li>
                                                                <label className="checkbox-default" htmlFor="fabric">
                                                                    <input type="checkbox" id="fabric" />
                                                                    <span>Fabric</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="checkbox-default" htmlFor="wood">
                                                                    <input type="checkbox" id="wood" />
                                                                    <span>Wood</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="checkbox-default" htmlFor="cotton">
                                                                    <input type="checkbox" id="cotton" />
                                                                    <span>Cotton</span>
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="sidebar-single-widget">
                                                <div className="sidebar-content">
                                                    <div className="banner-animate--flash">
                                                        <a href="product-details-default.html" className="sidebar-banner img-responsive">
                                                            <img src="assets/images/banner/banner-sidebar.webp" alt="" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="sidebar-single-widget">
                                                <h6 className="sidebar-title title-border">Tags</h6>
                                                <div className="sidebar-content">
                                                    <ul className="tag-link">
                                                        <li><a href="">Fabric</a></li>
                                                        <li><a href="">Cloth</a></li>
                                                        <li><a href="">Fashion</a></li>
                                                        <li><a href="">kid</a></li>
                                                        <li><a href="">Fakoli</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-8 offset-xl-1 col-lg-9">
                                        <ul className="product-shop-filter-info">
                                            <li className="prduct-item-traking"><span>total 08 of 40</span></li>
                                            <li className="prduct-item-filter">
                                                <select name="choice">
                                                    <option value="first">New Arrival</option>
                                                    <option value="second" selected>Featured</option>
                                                    <option value="third">Popular</option>
                                                </select>
                                            </li>
                                        </ul>
                                        <div className="product-shop-list-items">
                                            <div className="row mb-n25">
                                                <div className="col-md-6 col-12 mb-25">
                                                    <div className="product-single-item-style-1">
                                                        <a href="product-details-default.html" className="image img-responsive">
                                                            <img className="img-fluid" src="assets/images/products/default/product-default-style-1-img-1.webp" alt="" />
                                                            <ul className="tooltip-tag-items">
                                                                <li className="color-green">15%</li>
                                                            </ul>
                                                        </a>
                                                        <div className="content">
                                                            <div className="top">
                                                                <span className="catagory">MEN</span>
                                                                <h4 className="title"><a href="product-details-default.html">Man's Outdoor Shirt</a></h4>
                                                                <span className="price">$355.00 <del>$400.00</del></span>
                                                            </div>
                                                            <div className="bottom">
                                                                <ul className="review-star">
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star_half</span></li>
                                                                </ul>
                                                                <div className="product-event-items">
                                                                    <a href="cart.html" className="btn cart-btn">Add to cart</a>
                                                                    <a href="wishlist.html" className="btn wishlist-btn"><span className="material-icons">favorite_border</span></a>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-25">
                                                    <div className="product-single-item-style-1">
                                                        <a href="product-details-default.html" className="image img-responsive">
                                                            <img className="img-fluid" src="assets/images/products/default/product-default-style-1-img-2.webp" alt="" />
                                                        </a>
                                                        <div className="content">
                                                            <div className="top">
                                                                <span className="catagory">WOMEN</span>
                                                                <h4 className="title"><a href="product-details-default.html">Women Summer deal</a></h4>
                                                                <span className="price">$550.00</span>
                                                            </div>
                                                            <div className="bottom">
                                                                <ul className="review-star">
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star_half</span></li>
                                                                </ul>
                                                                <div className="product-event-items">
                                                                    <a href="cart.html" className="btn cart-btn">Add to cart</a>
                                                                    <a href="wishlist.html" className="btn wishlist-btn"><span className="material-icons">favorite_border</span></a>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-25">
                                                    <div className="product-single-item-style-1">
                                                        <a href="product-details-default.html" className="image img-responsive">
                                                            <img className="img-fluid" src="assets/images/products/default/product-default-style-1-img-3.webp" alt="" />
                                                        </a>
                                                        <div className="content">
                                                            <div className="top">
                                                                <span className="catagory">WOMEN</span>
                                                                <h4 className="title"><a href="product-details-default.html">Women Luxury Party</a></h4>
                                                                <span className="price">$1050.00</span>
                                                            </div>
                                                            <div className="bottom">
                                                                <ul className="review-star">
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star_half</span></li>
                                                                </ul>
                                                                <div className="product-event-items">
                                                                    <a href="cart.html" className="btn cart-btn">Add to cart</a>
                                                                    <a href="wishlist.html" className="btn wishlist-btn"><span className="material-icons">favorite_border</span></a>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-25">
                                                    <div className="product-single-item-style-1 swiper-slide">
                                                        <a href="product-details-default.html" className="image img-responsive">
                                                            <img className="img-fluid" src="assets/images/products/default/product-default-style-1-img-5.webp" alt="" />
                                                            <ul className="tooltip-tag-items">
                                                                <li className="color-yellow">15%</li>
                                                            </ul>
                                                        </a>
                                                        <div className="content">
                                                            <div className="top">
                                                                <span className="catagory">WOMEN</span>
                                                                <h4 className="title"><a href="product-details-default.html">Star Women pants</a></h4>
                                                                <span className="price">$200.00 <del>$300.00</del></span>
                                                            </div>
                                                            <div className="bottom">
                                                                <ul className="review-star">
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star_half</span></li>
                                                                </ul>
                                                                <div className="product-event-items">
                                                                    <a href="cart.html" className="btn cart-btn">Add to cart</a>
                                                                    <a href="wishlist.html" className="btn wishlist-btn"><span className="material-icons">favorite_border</span></a>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-25">
                                                    <div className="product-single-item-style-1 swiper-slide">
                                                        <a href="product-details-default.html" className="image img-responsive">
                                                            <img className="img-fluid" src="assets/images/products/default/product-default-style-1-img-1.webp" alt="" />
                                                            <ul className="tooltip-tag-items">
                                                                <li className="color-green">15%</li>
                                                            </ul>
                                                        </a>
                                                        <div className="content">
                                                            <div className="top">
                                                                <span className="catagory">MEN</span>
                                                                <h4 className="title"><a href="product-details-default.html">Man's Outdoor Shirt</a></h4>
                                                                <span className="price">$355.00 <del>$400.00</del></span>
                                                            </div>
                                                            <div className="bottom">
                                                                <ul className="review-star">
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star_half</span></li>
                                                                </ul>
                                                                <div className="product-event-items">
                                                                    <a href="cart.html" className="btn cart-btn">Add to cart</a>
                                                                    <a href="wishlist.html" className="btn wishlist-btn"><span className="material-icons">favorite_border</span></a>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-25">
                                                    <div className="product-single-item-style-1">
                                                        <a href="product-details-default.html" className="image img-responsive">
                                                            <img className="img-fluid" src="assets/images/products/default/product-default-style-1-img-2.webp" alt="" />
                                                        </a>
                                                        <div className="content">
                                                            <div className="top">
                                                                <span className="catagory">WOMEN</span>
                                                                <h4 className="title"><a href="product-details-default.html">Women Summer deal</a></h4>
                                                                <span className="price">$550.00</span>
                                                            </div>
                                                            <div className="bottom">
                                                                <ul className="review-star">
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star_half</span></li>
                                                                </ul>
                                                                <div className="product-event-items">
                                                                    <a href="cart.html" className="btn cart-btn">Add to cart</a>
                                                                    <a href="wishlist.html" className="btn wishlist-btn"><span className="material-icons">favorite_border</span></a>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-25">
                                                    <div className="product-single-item-style-1">
                                                        <a href="product-details-default.html" className="image img-responsive">
                                                            <img className="img-fluid" src="assets/images/products/default/product-default-style-1-img-4.webp" alt="" />
                                                        </a>
                                                        <div className="content">
                                                            <div className="top">
                                                                <span className="catagory">WOMEN</span>
                                                                <h4 className="title"><a href="product-details-default.html">Slightly jackets XL Cool </a></h4>
                                                                <span className="price">$350.00</span>
                                                            </div>
                                                            <div className="bottom">
                                                                <ul className="review-star">
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star_half</span></li>
                                                                </ul>
                                                                <div className="product-event-items">
                                                                    <a href="cart.html" className="btn cart-btn">Add to cart</a>
                                                                    <a href="wishlist.html" className="btn wishlist-btn"><span className="material-icons">favorite_border</span></a>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-25">
                                                    <div className="product-single-item-style-1">
                                                        <a href="product-details-default.html" className="image img-responsive">
                                                            <img className="img-fluid" src="assets/images/products/default/product-default-style-1-img-3.webp" alt="" />
                                                        </a>
                                                        <div className="content">
                                                            <div className="top">
                                                                <span className="catagory">WOMEN</span>
                                                                <h4 className="title"><a href="product-details-default.html">Women Luxury Party</a></h4>
                                                                <span className="price">$1050.00</span>
                                                            </div>
                                                            <div className="bottom">
                                                                <ul className="review-star">
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star</span></li>
                                                                    <li className="fill"><span className="material-icons">star_half</span></li>
                                                                </ul>
                                                                <div className="product-event-items">
                                                                    <a href="cart.html" className="btn cart-btn">Add to cart</a>
                                                                    <a href="wishlist.html" className="btn wishlist-btn"><span className="material-icons">favorite_border</span></a>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <ul className="page-pagination">
                                                <li className="icon-direction icon-direction--prev"><a href="#"><span className="material-icons-outlined">arrow_left</span></a></li>
                                                <li><a href="#">1</a></li>
                                                <li><a href="#">2</a></li>
                                                <li><a href="#">3</a></li>
                                                <li>...</li>
                                                <li><a href="#">10</a></li>
                                                <li className="icon-direction icon-direction--next"><a href="#"><span className="material-icons-outlined">arrow_right</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer-section footer-section-style-2 section-top-gap-120">
                    <div className="box-wrapper">
                        <div className="footer-wrapper section-fluid-270">
                            <div className="container-fluid">
                                <div className="footer-top">
                                    <div className="footer-top-left">
                                        <div className="footer-contact-items">
                                            <a className="icon-left" href="tel:+12345678910"><img className="icon-svg" src="assets/images/icons/icon-ios-call-dark.svg" alt="" />+123 4567 8910</a>
                                            <a className="icon-left" href="mailto:demo@example.com"><img className="icon-svg" src="assets/images/icons/icon-mail-open-dark.svg" alt="" />demo@example.com</a>
                                        </div>
                                    </div>
                                    <div className="footer-top-right">
                                        <div className="footer-social">
                                            <a href="https://www.facebook.com/" target="_blank" rel="noopener"><img className="icon-svg" src="assets/images/icons/icon-facebook-f-dark.svg" alt="" /></a>
                                            <a href="https://twitter.com/" target="_blank" rel="noopener"><img className="icon-svg" src="assets/images/icons/icon-twitter-dark.svg" alt="" /></a>
                                            <a href="https://www.pinterest.com/" target="_blank" rel="noopener"><img className="icon-svg" src="assets/images/icons/icon-pinterest-p-dark.svg" alt="" /></a>
                                            <a href="https://dribbble.com/" target="_blank" rel="noopener"><img className="icon-svg" src="assets/images/icons/icon-dribbble-dark.svg" alt="" /></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="footer-center d-none">
                                    <div className="footer-widgets-items">
                                        <div className="footer-widgets-single-item footer-widgets-single-item--dark">
                                            <h5 className="title">Product</h5>
                                            <ul className="footer-nav">
                                                <li><a href="#">Shop Vendor</a></li>
                                                <li><a href="#">Product House</a></li>
                                                <li><a href="#">Categories</a></li>
                                                <li><a href="#">Delivery Areas</a></li>
                                                <li><a href="#">Delivery Cost</a></li>
                                            </ul>
                                        </div>
                                        <div className="footer-widgets-single-item footer-widgets-single-item--dark">
                                            <h5 className="title">Offer</h5>
                                            <ul className="footer-nav">
                                                <li><a href="#">Shop Vendor</a></li>
                                                <li><a href="#">Product House</a></li>
                                                <li><a href="#">Categories</a></li>
                                                <li><a href="#">Delivery Areas</a></li>
                                                <li><a href="#">Delivery Cost</a></li>
                                            </ul>
                                        </div>
                                        <div className="footer-widgets-single-item footer-widgets-single-item--dark">
                                            <h5 className="title">Information</h5>
                                            <ul className="footer-nav">
                                                <li><a href="#">Shop Vendor</a></li>
                                                <li><a href="#">Product House</a></li>
                                                <li><a href="#">Categories</a></li>
                                                <li><a href="#">Delivery Areas</a></li>
                                                <li><a href="#">Delivery Cost</a></li>
                                            </ul>
                                        </div>
                                        <div className="footer-widgets-single-item footer-widgets-single-item--dark">
                                            <h5 className="title">About</h5>
                                            <ul className="footer-nav">
                                                <li><a href="#">Shop Vendor</a></li>
                                                <li><a href="#">Product House</a></li>
                                                <li><a href="#">Categories</a></li>
                                                <li><a href="#">Delivery Areas</a></li>
                                                <li><a href="#">Delivery Cost</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="footer-center">
                                    <div className="footer-widgets-items">
                                        <div className="footer-widgets-single-item footer-widgets-single-item--dark">
                                            <h5 className="title">Product</h5>
                                            <h5 className="collapsed-title collapsed" data-bs-toggle="collapse" data-bs-target="#dividerId-1">Product</h5>
                                            <div id="dividerId-1" className="widget-collapse-body collapse">
                                                <ul className="footer-nav">
                                                    <li><a href="contact.html">Shop Vendor</a></li>
                                                    <li><a href="contact.html">Product House</a></li>
                                                    <li><a href="contact.html">Categories</a></li>
                                                    <li><a href="contact.html">Delivery Areas</a></li>
                                                    <li><a href="contact.html">Delivery Cost</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="footer-widgets-single-item footer-widgets-single-item--dark">
                                            <h5 className="title">Offer</h5>
                                            <h5 className="collapsed-title collapsed" data-bs-toggle="collapse" data-bs-target="#dividerId-2">Offer</h5>
                                            <div id="dividerId-2" className="widget-collapse-body collapse">
                                                <ul className="footer-nav">
                                                    <li><a href="contact.html">Shop Vendor</a></li>
                                                    <li><a href="contact.html">Product House</a></li>
                                                    <li><a href="contact.html">Categories</a></li>
                                                    <li><a href="contact.html">Delivery Areas</a></li>
                                                    <li><a href="contact.html">Delivery Cost</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="footer-widgets-single-item footer-widgets-single-item--dark">
                                            <h5 className="title">Information</h5>
                                            <h5 className="collapsed-title collapsed" data-bs-toggle="collapse" data-bs-target="#dividerId-3">Information</h5>
                                            <div id="dividerId-3" className="widget-collapse-body collapse">
                                                <ul className="footer-nav">
                                                    <li><a href="contact.html">Shop Vendor</a></li>
                                                    <li><a href="contact.html">Product House</a></li>
                                                    <li><a href="contact.html">Categories</a></li>
                                                    <li><a href="contact.html">Delivery Areas</a></li>
                                                    <li><a href="contact.html">Delivery Cost</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="footer-widgets-single-item footer-widgets-single-item--dark">
                                            <h5 className="title">About</h5>
                                            <h5 className="collapsed-title collapsed" data-bs-toggle="collapse" data-bs-target="#dividerId-4">About</h5>
                                            <div id="dividerId-4" className="widget-collapse-body collapse">
                                                <ul className="footer-nav">
                                                    <li><a href="contact.html">Shop Vendor</a></li>
                                                    <li><a href="contact.html">Product House</a></li>
                                                    <li><a href="contact.html">Categories</a></li>
                                                    <li><a href="contact.html">Delivery Areas</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="footer-bottom">
                                    <p className="copyright-text copyright-text--dark">&copy; 2021 Mart Up. Made with <span className="material-icons">favorite</span> by <a href="https://hasthemes.com/" target="_blank" rel="noopener noreferrer">Codecarnival</a></p>
                                    <a href="#" className="payment-logo"><img className="img-fluid" src="assets/images/company-logo/payment-logo.png" alt="" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                <div id="scroll-to-top" className="scroll-to-top"><span className="material-icons-outlined">expand_less</span></div>
            </div>
        </>
    );
}

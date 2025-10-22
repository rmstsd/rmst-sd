import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__nav-inner">
          <div className="header__logo">
            <div className="header__logo-icon">M</div>
            <span className="header__logo-text">M4 QuickFleet</span>
          </div>
          <ul className="header__menu">
            <li className="header__menu-item">
              <a href="#" className="header__menu-link">首页</a>
            </li>
            <li className="header__menu-item">
              <a href="#" className="header__menu-link header__menu-link--active">项目视频</a>
            </li>
            <li className="header__menu-item">
              <a href="#" className="header__menu-link">界面图集</a>
            </li>
            <li className="header__menu-item">
              <a href="#" className="header__menu-link">技术研究</a>
            </li>
            <li className="header__menu-item">
              <a href="#" className="header__menu-link">猫属任务</a>
            </li>
            <li className="header__menu-item">
              <a href="#" className="header__menu-link header__menu-link--icon">中</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="header__hero">
        <div className="header__hero-bg-text">QuickFleet</div>
        <div className="header__hero-content">
          <h1 className="header__hero-title">M4 调度系统项目视频</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;

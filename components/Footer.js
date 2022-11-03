import styled from "styled-components";
import { Globe, Facebook, Twitter, Instagram } from "react-feather";

export default function Footer() {
  return (
    <MyFooterSection>
      <div className="footerInner">
        <div>
          <h2>About</h2>
          <ul>
            <li>How Vacation Rental System works</li>
            <li>Newsroom</li>
            <li>Vacation Rental System 2021</li>
            <li>Investors</li>
            <li>Vacation Rental System Plus</li>
            <li>Vacation Rental System Luxe</li>
            <li className="lg-hidden">HotelTonight</li>
            <li className="lg-hidden">Vacation Rental System for Work</li>
            <li className="lg-hidden">Made possible by Hosts</li>
            <li className="lg-hidden">Careers</li>
            <li className="lg-hidden">Founders&apos; Letter</li>
          </ul>
        </div>
        <div>
          <h2>Community</h2>
          <ul>
            <li>Diversity & Belonging</li>
            <li>Accessibility</li>
            <li>Vacation Rental System Associates</li>
            <li>Frontline Stays</li>
            <li>Guest Referrals</li>
            <li>Vacation Rental System.org</li>
          </ul>
        </div>
        <div>
          <h2>Host</h2>
          <ul>
            <li>Host your home</li>
            <li>Host an Online Experience</li>
            <li>Host an Experience</li>
            <li>Responsible hosting</li>
            <li>Resource Centre</li>
            <li>Community Centre</li>
          </ul>
        </div>
        <div>
          <h2>Support</h2>
          <ul>
            <li>Our COVID-19 Response</li>
            <li>Help Centre</li>
            <li>Cancellation options</li>
            <li>Neighbourhood Support</li>
            <li>Trust & Safety</li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p>
            <div>
              <Globe className="globe" />
              English
            </div>
            <div className={"mr-[1rem]"}>
              <Facebook />
            </div>
            <Twitter />
            <div></div>
            <div className={"ml-0"}>
              <Instagram />
            </div>
          </p>
          <p>
            &copy; 2022
            <a
              href="https://github.com/Rohan3011"
              target="_blank"
              rel="noreferrer"
            >
              Rohan Kamble dev
            </a>
          </p>
        </div>
      </div>
    </MyFooterSection>
  );
}

const MyFooterSection = styled.footer`
  padding: 5rem;
  background: #efeff5;

  h2 {
    font-size: 1rem;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    font-weight: 800;
  }
  .footerInner {
    & > span {
      display: flex;
      flex-direction: column;
      padding: 1.5rem 0;
    }
    & > span + span {
      border-top: 1px solid #0002;
    }
    & > span:first-of-type {
      padding-top: 0;
    }
    & > span:last-of-type {
      padding-bottom: 0;
    }
    ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      li {
        padding: 0.25rem 0;
        font-size: 0.85rem;
        cursor: pointer;
        opacity: 0.8;
        transition: all 0.2s;
        width: fit-content;
        &:hover {
          opacity: 1;
          text-decoration: underline;
        }
      }
    }
    .footer-bottom {
      display: flex;
      flex-direction: row-reverse;
      align-items: flex-end;
      justify-content: space-between;
      a {
        margin-left: 0.5rem;
        cursor: pointer;
      }
      a:hover {
        text-decoration: underline;
        cursor: pointer;
        color: #e0565b;
      }
      svg {
        height: 1rem;
        cursor: pointer;
      }
      svg.globe {
        cursor: pointer;
        margin-right: 0.1rem;
      }
      span + span {
        margin-left: 1rem;
        cursor: pointer;
      }
      p,
      span {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
  @media (max-width: 36rem) {
    .footerInner .footer-bottom {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
  }
  @media (min-width: 81rem) {
    .footerInner {
      display: flex;
      flex-flow: row wrap;
      max-width: 1200px;
      margin: 0 auto;
      justify-content: space-between;
      .footer-bottom {
        flex: 0 0 100%;
        padding-top: 1.5rem;
        margin-top: 1.5rem;
      }
      .lg-hidden {
        display: none;
      }
      & > span:not(.footer-bottom) {
        padding: 0;
        border-top: none !important;
      }
    }
  }
`;

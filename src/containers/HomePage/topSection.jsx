import React from "react";
import styled from "styled-components";
import { BrandLogo } from "../../components/brandLogo";
import TopSectionBackgroundImg from "../../images/home-bg.jpg";


const TopSectionContainer = styled.div`
  width: 100%;
  height: 800px;
  background: url(${TopSectionBackgroundImg}) no-repeat;
  background-position: 0px -50px;
  background-size: cover;
  }
`;
// @media screen and (max-width: ${deviceSize.mobile}px) {
//     height: 700px;
//     background-position: 0px 0px;

const BackgroundFilter = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(38, 70, 83, 0.9);
  display: flex;
  flex-direction: column;
`;

const TopSectionInnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const StandoutImage = styled.div`
  width: 44em;
  height: 34em;

  img {
    width: 100%;
    height: 100%;
  }
`;
const LogoContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export function TopSection(props) {
	return(
		<TopSectionContainer>
			<BackgroundFilter>
				<LogoContainer>
					<BrandLogo />
				</LogoContainer>
			<h2>College Gate</h2>
				BOOM
			</BackgroundFilter>
		</TopSectionContainer>

	) 
}
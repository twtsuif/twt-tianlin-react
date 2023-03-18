import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import twt from "../images/twt.png";

const { Footer } = Layout;

const FooterBox = styled.div`
  text-align: center;
  position: relative;
`;



const PBox = styled.div`
  color: white;
`;

export default function AppFooter() {
  return (
    <>
    <div style={{}}>
      <Footer style={{ padding: 0,marginBottom:`1px`}}>
          <FooterBox>
          <div style={{width:`100%`,height:`200px`,backgroundColor:`#344B77`}}>
            <div style={{marginLeft:`-2%`}}>
            <br></br>
              <a href="https://www.twt.edu.cn">
                天外天工作室
              </a>
              <PBox>© 2000-2019/津ICP备05004358号-12/津教备0767号</PBox>
              <br></br>
              <img src={twt} alt=''></img>
              <br></br>
              <br></br>
            </div>
        </div>


        </FooterBox>
      </Footer>
    </div>
    
      
    </>
  );
}


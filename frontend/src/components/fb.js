import React from "react";

import { Container, Segment } from "semantic-ui-react";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon,TelegramShareButton,TelegramIcon } from "react-share";
import FacebooIcon from '@mui/icons-material/Facebook';
import WhatsApIcon from '@mui/icons-material/WhatsApp';
import TelegraIcon from '@mui/icons-material/Telegram';


// Hello Everyone,
//                               I have ${props.location.record_type} a product ${
//                       props.location.product_type
//                     }.
//                               Below are the details 
//                               Location : ${props.location.location}
//                               Date     : ${String(
//                               ).substr(0, 10)}
//                               If anyone ${
//                                 
//                               } this product, please contact me.

function Fb(props) {
  var str ="https://www.google.com/search?q=image&rlz=1C5CHFA_enUS1022US1025&sxsrf=ALiCzsYap8zhVKQgoaYkv78Ysv3CbAWXYQ:1667543492170&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi1_f3L85P7AhW3EEQIHVDTCYEQ_AUoAXoECAIQAw&biw=1680&bih=939&dpr=2#imgrc=Lx0h_dF4wzAdqM"
  return (
    <div>
      <Container>
        <Segment>
          <div>
            <table
              style={{ marginLeft: "60px", width: "80%", marginTop: "10px" }}
            >
              <tr>
                <td>
                  <FacebookShareButton
                    url={str}
                    quote={`I found the item available in this store`}
                    hashtag={
                      "#Available"
                    }
                  >
                    <FacebooIcon  fontSize="large"></FacebooIcon>
                  </FacebookShareButton>
                </td>
                <td>
                  <WhatsappShareButton
                    title={`I found the item available in this store`}
                    url={str}
                  >
                    <WhatsApIcon  fontSize="large"></WhatsApIcon>
                  </WhatsappShareButton>
                </td>
                 <td>
                  <TelegramShareButton
                    url={str}
                    quote={`I found the item available in this store`}
                   title={`I found the item available in this store`}
                  >
                    <TelegraIcon fontSize="large"></TelegraIcon>
                  </TelegramShareButton>
                </td>
              </tr>
            </table>
          </div>
        </Segment>
      </Container>
    </div>
  );
}
export default Fb;
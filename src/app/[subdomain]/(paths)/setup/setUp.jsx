// import { API_BASE_URL } from "@/app/utils";
import axios from "axios";
import { Button } from "primereact/button";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

export default function SetUp() {



  useEffect(()=>{
    axios.get("http://192.168.1.13:8081/facebook/setup")
    // axios.get(`${API_BASE_URL}/facebook/setup`)
    .then((res)=>{
      // console.log(res.data)

    })
  },[])
  const setup = [
    {
      title: "Facebook Integration",
      img: "data:image/png;base64,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",
      Subtitle:
        "Fetch your leads generated via Facebook Leads automatically to the CRM.",
    },
    {
      title: "Google   -Integration",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAABMlBMVEX4+Pj////qQzU0qFNChfT7vAXj7P0tfPP7+/s4gPSZufj7ugD/vQDpLhr7twD7uQAaokPoKhPqPS7pMB3++Pf0rKjqPzD8wwAzqkItpk7629n74N7pNiXvdm74x8TrTD/pNzf+7Mb8zmX//vj81X77wSL+8NP95bD925P+9+P803bz9/78y1j7xT/c5/1flfVCrV7T6tiExZPE1vvx+fPk8ufwhn/sWU72vLjxj4n7393vfnbtaF/zoZvznZf86unxi4TuYSj94aTxeib1mhnrTjLvbCrzjB/tYVf4pxMMcvN1ovbGtieZsTnJ5c+Irvdjq0hiuHewyPrauByvszB8rkGz27xJqk61y/o/jtJsu39Rsmk7l6uo1bI3oIBAiuA9k785nJQ2pGsfpjFsrb9/w4/Fc9q+AAAFZUlEQVR4nO2d7XPaRhCHDTIBArIFMmABNmlSN23S2kBM4hS35K1tkiY0dls3sUvf8///C5UAAxJ36IROuhnt7/mSD7nRzD6zu3d7GqONDQAAAAAAAAAAAAAAAAAAAAAAIEMul5JELqc6lriRpm6mUHVEMSLb3QTVUcWE9My7hkIGRiaPhMBI7SXeX7TyHFRHGCXR20uyvzjsJddfxH3vmqT2v3jsJTX94rKXTH8xla5DEss3PntJTL8Yky+J6RenvQSmH/SFIdbaTV71xmsvcekHfaFYR8HOoFGvNwY70Be09dUrDx+ZJV03TV0vma1+pR7wAclqfkH05fb7ZbNZrqZnVMtNs7l3EiQNqeprPC6b5TSDcrP58Gui+oTl7ZWY7qYGS3uiRUxR305/lbyJwL5gCauOWCpCEVd0H3ljgfoJ9DHYOTX95TmYeyIJqDpiqfiHW28KpN40AdMN6HNzUhKVZ1PV96FvkW+C2EunSxXoW+BbXbY9SvoqwezpAvYI6duXXrmU9DXYuVdu6nq11arqurk4/wrao6OvVWW4M9NP9geT/x/sP27ND9SC9sjoe9Jclqd7Z9t6fypQqO8R0ldfbnzmKeNY3BgPJcL2qOhbKt2qyRlqT/SqaOWS0VfxDrrlRwPe2oEpbo+Ivqe33PaapyuUBLluVh2xVHhBPss8d/krr7IXCNURS4UX5EGm9mLBX7Ulyx4JfZ9sZTK1re9mAk1u34M+BrcLGYfvp/54ey70MbkzsZep/TD2V30pzx4FfU7tTvy9Gk8UQd+FE9f36TT7bApPb8nbdYnoO5jry9Sem/438NC3wJ2tzAK1F6w1N/y4T1bfZy59hXusNa+zPvxIVt/d7UV923dZa7KbPhyR1fe5S9/WF2vp2ySr717BVbzMNb76spzmpzpiqTAjvL2or3Cwpr4bVPV96dL3FfRxiVDfIfRB32qYEcrpfWT1ydl5yfY+Kec+ugcXKVNHnqw+kZk3m1/C449tj4A+941L8Q1rzc1ljlz26M68i/d9heJbY8gx4cGlL/8TXX3z2+Zi5p1mnQnZu+9qh/lzuvpm7zqKP2s2RkdE33tX8+Md+yjou37TVvzFsadZVyL63K0vz/trOdURS4UT43juKBZ/1SYYF/72Dt21y7tsJqHPqd7iwW/aNcaxrz5P8r2nrM/ee4tvtDlW28/eufvYx5s5iOh7tv1WW8Rv93WX7orapaEv9U7TAvg79Iwc2QfE9V0YXn9tfv97sDQB802rjlgq/DDbltcfd/89f+2Rx984yOjreNPP3n/PeoyFw7b1QfC6gJC+VNebfk4CXnoGkNzFlWFpu7+7Jw5+56Ojb7l8xwK17sU0B487o0vDGC/a/WNzLnDFtktJX2+5fCcGHWft8T8zwVb7z5k//pmPlL7UkO2PLXX3r6xA6VLSlxoF8Kft/j3Ov+zN1c9UHbFUVoca0N8/R3mfxkdMXzB/lvUhy7ujp6lvefpYyb//+T5QdcRS8Y021bEY5xcORtf/eaojlop/uKnjM8EE5E91lPU5DVAkAY0r1kgHfXYCXvoKtIyR2LNURywVsZDtCWS1QMPqCv6QYrJ+v0/81yN7XYtj0DLaI/93IcT12Qw/2gZdG7FlT77trtBrYOiz6Y0+XhkztMvuUDjvkqhvrd9tPu71Op1eL6C4Carjlcw6CsKgOl7JQF8o8MWEcMSrT3W00oG+UOBbReGIU5/qWCMA32kLR3z6VEcaDbAXCnwhNRyx+EusPXwdOiywF46I6zfBlTshUn+Jt7cRoUAK8hyisac6qhiRnoFUMm9GTprCHDl3AAAAAAAAAAAAAAAAAAAAAADK/A9HG5Tpmm+26QAAAABJRU5ErkJggg==",
      Subtitle: "Fetch your leads generated via Facebook Leads automatically",
    },

    {
      title: "LinkedIn Integration",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATYAAACjCAMAAAA3vsLfAAAAeFBMVEX4+PgKZsL///8AZMH///sAW7/7+/nP2es1dscAXsAAY8GeueE1ecn7/v8UasPF1u0AWL4AXL8AYcG1yeVJhMyKrNrU3+5HgsuuxOPu8vZvmtUZbsWDp9qWs917odZbjc/k6/O/0Ojd5fArc8dXis6zyeiSst7z+Py0zT8YAAAEh0lEQVR4nO2d25qiOhBGhYRogocYEM/Httv3f8MN43SPQND50ok9u/zXJXxcsKxQOVnp9QAAAAAAAAAAAAAAAAAAAAAAAIB/FiG4B4T46fd4IqWyXpFtd/t88A3y/W6bFb1XUSf4Ic2NltIoxb6BUkZKbfL0wOmLE/x41lKxyBNMSX0+UhfH+wOtfCn7ROlBn//0mwVE9Fb+pV3FrXpkA46fxjKEtAo5PhENOD7R3j5pbZiekPTGJ0lAa6W3hKI30Q9rrfLWJ/d9E0t/nY5Ob2pJzRufm9DWosjMiTVTnibhrUVRktLytjTBm2gFM8ufflOf8FmwDlsdOSMVbs8JtircfvpNPSIW0+dYi6Lpgk4y5fMgI1EbilAyXepnWYsiTSYpiKyzjTLm+6M3zai0Uj6zd3WZ1OPh21R77QgbMrmUn62ftunb4hKX9Fc+Z0bUnoy2tU2L/og/Oa39pQy2pqJN2AZW+j3+w+jNn7eEyrftYEmkchPfcvDXsaOSSkXRjjamRjVt8cbb6CspaISbTZupB1sZbt66dmS09dvakklDW2xNG07aiMzx2rTpU1Nb7ispQBu0td6tqW2IRlrHpk2mDWsXf5mUsDY2bGh799Zxo6wt0sdAiZS2NmaWt9Z2/tYaSGuL1PhwY83jpDltbRFLPi5XaZOBz3Ut4trKdCrPs3S7GideVxrIaytbqpTS91rgC2gLAbRB27dh1X56Yx5v9yKurf4vg/uXmdFyvprNNqu51PK+OdramLrljyDWvsyk2RRffbziY3x3XyZpbc2x/O8JkOZkeVReNjJtzKBn93acQ1scl+E2PV/iFpvupVVoq7TdLKfWAq7TG7SV2vTCaq0ckXWt2UBbHHfEWsWiwxu0xaO801oc7+1bbqAtHh3ibi72fgi0PcC+jxraHrC0jj6g7RHWfXPQ9gjrche0fXJKd6vNe3uwYN1vA22/5eRaGmOmetu6NbbkUmj7xeTr7/V61bxn2zgCbRXFzeBTZ42bO0uPF9oqbnf1srfGTVvPDdpKstqzuqjfTaHNrq3+9Wo+BW12baP6woFpJAVos2s71XtmqjEjAm12bY1H1Rza/kbbpP5oczchtHVoq486oQ3aHgBtTkCbE9DmBLQ5AW1OQJsT0OYEtDkBbU5AmxPQ5gS0OQFtTkCbE9DmBLQ5AW1OQJsTthpHIbVRqXEEbU5Y67cF00alfpu1WmDAaCMSbNbalF3a2HeXl+nUpuT79qZHFo1rfF2vX27tMm081f49CFVCtdXdZX/17+WWlge3KdXdvVPl2T90qjyjprgbz6xgn1NpozgvwRmczuECzoJx4wmHg1UwRSchVPDFc865WpAKtmedqkYojV7BGX5uiCL8iZFUZtpuwfmkbpTeAg4WFFFr1dnL63BnL6+pnr2Mk76d4f1hiHPlh6TPlS8R/HjW0l9nhCmpz0dOOdSuCH5Ic6OlNFURRXdUVeNTmzw9vIC0XwjeK7Ltbp8PB84M8/1umxW9V3F2RQjuAfFSzgAAAAAAAAAAAAAAAAAAAAAAAPzf+A8VFnya3S8lZwAAAABJRU5ErkJggg==",
      Subtitle: "Fetch your leads generated via Facebook Leads automatically",
    },

    {
      title: "G-Email Integration",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAArlBMVEX////08vLxQjbTLSnxNij3qqb39vb09vbxOy7RFg/0+fnYSkbSKSTuwsHxhH75+fnYQDvYTUr0/f7xLRvxPjLxsa/xKxjvVkzxNSbxiIPwMSDwRjrz5eTwOyzz3NvdNC3po6HRHBfyb2fPAAD40tDzk47yfXfydm/2vLnwZl7xmZX76OfwXlbwIgnwsK3vcWrz1tXnPTPyf3ntnprxUUb0wb7fa2jaXFrhenj4y8kd4RlCAAAEtElEQVR4nO2cC3OiSBSFB1Sa9EazC4iAYl4+M0k2j3Fm/P9/bBBjeF0UTK9sXc9XqZSpMp26J/dcDk0n374BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8D9iMp3N5u/WlfEfYE3ms7m/aLpEZczc0DTNYDkSmmoM+eBGa4fB8HvTVarBD/QYM+hahlqt5OjR2y7uhFdN16mC70/6DtcXSptLrmxnt7bXabpQFfS9T7H09mAslUkltJ6dLO3cNV2oCjptPVWS/Wwp0kqOh5mVH5suVAUZsXTd/ldTYUVD3jw56XWdQdOFqiAnlm7qk69bUWh3QXZZnmJFVnz46lXRmoRmflWeYkVXrscvRS5DTl0nvyZbsXTHWx1vRTEaeMSSLMS6uS1WFs353rGRy1p4hbaKeP2r6UJVcHPbotRq/zgqcgmRDlcJ15dcxGq9EuU57rOsPeflix5SWrVafMRqXVMVBnUjlyE7NmnB6Cdc/t10oSqIxWqRVjT1dZ08L0b5cPVhwc36jDqrpLkc96G6FeXazIerXVuxE4turihyVZvzZLjatRUbseKc9Xq9KeqVqNbxFlWsKMdkuNJ3vwhOYn04ZqkTRrJ78uCctxbEZHfsu8tErH+aLlQFKbFM31gSI7o9PBC5hDYjwpUZTiYXiVgsroYpscKetB6IyeO4N/usKF+GRLgK7jSre8HXhqEvNaus8jIrGtY7pe9TRwrBWSyzJzeemlOeckp2ucSo3LmsxQo3YkWt0g8oK06pOW9129Q14S2+DWctVtxZWlkO8AaFyCXE1C2+0QkW293DsxBLE2TC3IiQnezjAbEZloiaEYtddOh9to61LmwMb+w1S+1yGbJPhqvpp6IZsbhFh5RYmtSowR0OX3ZvoS8EoTNJuo+1DcOUWNGc71BWtN+384jeucpGDN5i+ZkJHoVNYiQFy0gPIclwZXcyz4VYi5W24dZpb+RtTNcaPVLhKr8TzVqsXGdt5vyCiFy67TvE9Hd7Ri6IsRYr31kbK5LPtYhp5dirwv3juUSHpOCSTb0c5CYh7+hQsGHcXGTkyrYVvf3M2oYh0VkadcojR9ldNmuxKBvGWPQjrg9KH5mdp1hR5PpBRK6tBcvPv52pWJoQb8T+gr7/Mf+5ilUWuVx/z9MM3tGBvBruSM5pJ98QpsJV8XLIOzrs66ztXwBkmitY7n8Cy9uGeztLyx1/PHyckrdY+ztLizexdpErs3MFsUh2p4rsef62+dzE8iucx5LjKHI5Qb/CCQjeYpV3Vmo4CdF7qnaGknd0qGDDDVa32ulc1tGh5EaaUKHi21jb8FB0qAlvsap2FsSCWIc5ZmZBLOrpjkKxzjU6HCUWt+iAmXUIiFWDU80sbmKhsw6BzqrBqToL0aGGWNyiAxL8ITCzaoAtmhogOtQAYtUA0aEGiA41QHSoAaJDDTDgawAb1gCdVYNVcBqxfjZdqAqu7JOIdb9qulAl9N0TiHXxq+kyFdEPAi/GflMt1v1tzMX976aLVMe6v+gvoo/1VYKR+px9VXid/jLD+Lkf02XyP7sBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKACfwAZ5n5tiGSRGAAAAABJRU5ErkJggg==",
      Subtitle: "This helps users to get their Leads from Gmail to the CRM.",
    },
  ];

  return (
    <div>
      <Row className="mt-2">
        <Col style={{ color: "white" }} md={5}>
          <div className="card p-5">
            <h5>Help</h5>
            <hr />
            {/* <p> */}
              Integration Screen
              <ul>
                <li>1. Enables you to connect to different lead sources.</li>
                <li>
                  2. Please follow the steps provided at each level to enable
                  integration
                </li>
                <li>
                  3. You can also test the connectivity by clicking on the
                   `Test` button
                </li>
              </ul>
            {/* </p> */}
          </div>
        </Col>
        <Col md={7}>
          <div className="card p-5">
            <h5>Select One To Integrate</h5>
            <hr />

            <Row>
              {setup.length > 0 ? (
                setup.map((d,i) => (
                  <Col md={6} key={i}>
                    <div className="text-end">

                    <Button style={{borderRadius:"20px"}}>Set</Button>
                    <Button className="ms-2" style={{borderRadius:"20px"}}>Test</Button> 
                    </div>
                    <div className="d-flex">

                    <img src={d.img} alt="" width={"100px"} style={{borderRadius:"50%"}} />
                    <span className="mt-2">{d.title}</span>
                    </div>
                    <p>{d.Subtitle}</p>
                  </Col>
                ))
              ) : (
                <></>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

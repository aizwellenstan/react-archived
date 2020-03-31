import React, { useState } from 'react'
import { SidebarContainer } from 'client/src/containers/sidebar-container';
import { Page } from 'client/src/components/page';

import { styled } from 'client/src/styles';
import { sidebarWidth } from 'client/src/styles/constants';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-left: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  @media screen and (min-width: 700px) {
    width: calc(100% - ${sidebarWidth}px);
    margin-left: ${sidebarWidth}px;
  }
`;

export const ModulePermission = () => {
  const [loading, setLoading] = useState(false);
  const [didfetch, setDidfetch] = useState(false);

  const [MDMonitor, setMDMonitor] = useState([]);
  const [UDMonitor, setUDMonitor] = useState([]);
  const [GDMonitor, setGDMonitor] = useState([]);

  const [MHMonitor, setMHMonitor] = useState([]);
  const [UHMonitor, setUHMonitor] = useState([]);
  const [GHMonitor, setGHMonitor] = useState([]);

  const [MWMonitor, setMWMonitor] = useState([]);
  const [UWMonitor, setUWMonitor] = useState([]);
  const [GWMonitor, setGWMonitor] = useState([]);

  const [MDEditor, setMDEditor] = useState([]);
  const [UDEditor, setUDEditor] = useState([]);
  const [GDEditor, setGDEditor] = useState([]);

  const [MHEditor, setMHEditor] = useState([]);
  const [UHEditor, setUHEditor] = useState([]);
  const [GHEditor, setGHEditor] = useState([]);

  const railsApi = 'https://siemensproduct.nadi3docms.com/api'
  const CompanyId = localStorage.getItem('CompanyId');
  const ProductId = localStorage.getItem('ProductId');
  const ProjectId = localStorage.getItem('ProjectId');

  const fetchData = () => {
    const SOURCE_URL = `${railsApi}/${CompanyId}/${ProductId}/${ProjectId}/modulepermission/api`;
    setLoading(!loading);
    fetch(SOURCE_URL, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    })
    .then(response =>
      response.json().then(data => ({
        data: data,
        status: response.status,
      })),
    )
    .then(res => {
      if (res.status === 401) {
        alert('サーバー死んだ');
        setLoading(!loading);
      } else {
// res.data 
// {
//     "MD": "[7338799,262143,1,7,1,1,31,3,1,1,1]",
//     "MH": "[8293218,0,1,0,1,1,29,1,0,1,0]",
//     "MW": "[8293218,0,1,0,1,1,29,1,0,0,0]",
//     "UD": "[7248687,0,1,0,1,1,31,3,1,1,1]",
//     "UH": "[8293218,0,1,0,1,1,29,1,0,1,0]",
//     "UW": "[8293218,0,1,0,1,1,29,1,0,0,0]",
//     "GD": "[7248687,0,1,0,1,1,31,3,1,1,1]",
//     "GH": "[8293218,0,1,0,1,1,29,1,0,1,0]",
//     "GW": "[8293218,0,1,0,1,1,29,1,0,0,0]"
// }

        let sourceMD=JSON.parse(res.data[0].MD)
        let sourceMH=JSON.parse(res.data[0].MH)
        let sourceMW=JSON.parse(res.data[0].MW)
        let sourceUD=JSON.parse(res.data[0].UD)
        let sourceUH=JSON.parse(res.data[0].UH)
        let sourceUW=JSON.parse(res.data[0].UW)
        let sourceGD=JSON.parse(res.data[0].GD)
        let sourceGH=JSON.parse(res.data[0].GH)
        let sourceGW=JSON.parse(res.data[0].GW)
        handleBinary(sourceMD[0], "MDMonitor", "Main")
        handleBinary(sourceUD[0], "UDMonitor", "Main")
        handleBinary(sourceGD[0], "GDMonitor", "Main")

        handleBinary(sourceMH[0], "MHMonitor", "Main")
        handleBinary(sourceUH[0], "UHMonitor", "Main")
        handleBinary(sourceGH[0], "GHMonitor", "Main")

        handleBinary(sourceMW[0], "MWMonitor", "Main")
        handleBinary(sourceUW[0], "UWMonitor", "Main")
        handleBinary(sourceGW[0], "GWMonitor", "Main")

        handleBinary(sourceMD[1], "MDEditor", "Main")
        handleBinary(sourceUD[1], "UDEditor", "Main")
        handleBinary(sourceGD[1], "GDEditor", "Main")

        handleBinary(sourceMH[1], "MHEditor", "Main")
        handleBinary(sourceUH[1], "UHEditor", "Main")
        handleBinary(sourceGH[1], "GHEditor", "Main")

        handleBinary(sourceGH[1], "GHEditor", "Main")
      }
    });
  };

  var monitorArray = [
    "isQuit",
    "isLogOut",
    "isHostSetting",
    "isLanguage",
    "isResolution",
    "isWorkingType",
    "isSwitchType",
    "isSetting",
    "isVR",
    "isAR",
    "isMouse3D",
    "isDevice",
    "isConsoleView",
    "isTreeView",
    "isMonitorView",
    "isAlertListView",
    "isLBSView",
    "isTimeBarView",
    "isVideoView",
    "isWebBrowserView",
    "isReportView",
    "isWindows",
    "isEnable"
  ]

  const handleBinary = (data :any, rank: String, group: String) => {
    const toBinary = (n: Number) => n.toString(2);
    var binaryString = toBinary(data)
    
    var strx = binaryString.split('')
    var binaryArray :Array<String>=[] 
    binaryArray = binaryArray.concat(strx);
    var setInit = []
    
    if(group = "Main") {
      for(var i=0; i<binaryArray.length; i++){
        if(binaryArray[i]=="1") {
          setInit[i]=true
        }else{
          setInit[i]=false
        }
      }
      switch (rank) {
        case 'MDMonitor':
          setMDMonitor(setInit)
          break;
        case 'UDMonitor':
          setUDMonitor(setInit)
          break;
        case 'GDMonitor':
          setGDMonitor(setInit)
          break;
        case 'MHMonitor':
          setMHMonitor(setInit)
          break;
        case 'UHMonitor':
          setUHMonitor(setInit)
          break;
        case 'GHMonitor':
          setGHMonitor(setInit)
          break;
        case 'MWMonitor':
          setMWMonitor(setInit)
          break;
        case 'UWMonitor':
          setUWMonitor(setInit)
          break;
        case 'GWMonitor':
          setGWMonitor(setInit)
          break;
        case 'MDEditor':
          setMDEditor(setInit)
          break;
        case 'UDEditor':
          setUDEditor(setInit)
          break;
        case 'GDEditor':
          setGDEditor(setInit)
          break;
        case 'MHEditor':
          setMHEditor(setInit)
          break;
        case 'UHEditor':
          setUHEditor(setInit)
          break;
        case 'GHEditor':
          setGHEditor(setInit)
          break;
        default:
          console.log('Err');
      }
    }
  }

  const handleSubmit = 
  () => {
    console.log("Submmit =>")
    var toBinary = (source :Array<boolean>) => {
      var binaryArray= []
      for (var i in source) {
        if(source[i]) {
          binaryArray.push(1);
        } else {
          binaryArray.push(0);
        }
      }

      var binaryString = binaryArray.toString().replace(/,/g,'')
      let buffer = BigInt("0b"+binaryString)
      let bufferString = buffer.toString()
      bufferString = bufferString.substring(0, bufferString.length);
      return bufferString;
    }
    var binaryMDM=toBinary(MDMonitor)
    var binaryUDM=toBinary(UDMonitor)
    var binaryGDM=toBinary(GDMonitor)
    var binaryMHM=toBinary(MHMonitor)
    var binaryUHM=toBinary(UHMonitor)
    var binaryGHM=toBinary(GHMonitor)
    var binaryMWM=toBinary(MWMonitor)
    var binaryUWM=toBinary(UWMonitor)
    var binaryGWM=toBinary(GWMonitor)

    console.log(binaryMDM)
    console.log(binaryUDM)
    console.log(binaryGDM)
    console.log(binaryMHM)
    console.log(binaryUHM)
    console.log(binaryGHM)
    console.log(binaryMWM)
    console.log(binaryUWM)
    console.log(binaryGWM)

    var body = {
      MD:"",
      MH:"",
      MW:"",
      UD:"",
      UH:"",
      UW:"",
      GD:"",
      GH:"",
      GW:""
    }
    body.MD=`[${binaryMDM},262143,1,7,1,1,31,3,1,1,1]`
    body.MH=`[${binaryMHM},0,1,0,1,1,29,1,0,1,0]`
    body.MW=`[${binaryMWM},0,1,0,1,1,29,1,0,0,0]`
    body.UD=`[${binaryUDM},0,1,0,1,1,31,3,1,1,1]`
    body.UH=`[${binaryUHM},0,1,0,1,1,29,1,0,1,0]`
    body.UW=`[${binaryMWM},0,1,0,1,1,29,1,0,0,0]`
    body.GD=`[${binaryGDM},0,1,0,1,1,31,3,1,1,1]`
    body.GH=`[${binaryGHM},0,1,0,1,1,29,1,0,1,0]`
    body.GW=`[${binaryGWM},0,1,0,1,1,29,1,0,0,0]`

    console.log("postBody=>")
    console.log(body)
    const POST_URL = `${railsApi}/${CompanyId}/${ProductId}/${ProjectId}/modulepermission`;
    // post data body
    // {
      //     "MD": "[7338799,262143,1,7,1,1,31,3,1,1,1]",
      //     "MH": "[8293218,0,1,0,1,1,29,1,0,1,0]",
      //     "MW": "[8293218,0,1,0,1,1,29,1,0,0,0]",
      //     "UD": "[7248687,0,1,0,1,1,31,3,1,1,1]",
      //     "UH": "[8293218,0,1,0,1,1,29,1,0,1,0]",
      //     "UW": "[8293218,0,1,0,1,1,29,1,0,0,0]",
      //     "GD": "[7248687,0,1,0,1,1,31,3,1,1,1]",
      //     "GH": "[8293218,0,1,0,1,1,29,1,0,1,0]",
      //     "GW": "[8293218,0,1,0,1,1,29,1,0,0,0]"
      // }
    fetch(POST_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then(response =>
        response.json().then(data => ({
          data: data,
          status: response.status,
        }))
      )
      .then(res => {
        alert(res.data.message)
        fetchData()
      })
  }

  if (localStorage.getItem('login') !== 'true') {
    localStorage.setItem('pageNow', 'Login');
    window.location.reload();
  }

  if (!didfetch) {
    fetchData()
    setDidfetch(!didfetch)
  }

  var Body =() => {
    let MDMonitorCheckbox = []
    let UDMonitorCheckbox = []
    let GDMonitorCheckbox = []
    let MHMonitorCheckbox = []
    let UHMonitorCheckbox = []
    let GHMonitorCheckbox = []
    let MWMonitorCheckbox = []
    let UWMonitorCheckbox = []
    let GWMonitorCheckbox = []
    let MDEditorCheckbox = []
    let UDEditorCheckbox = []
    let GDEditorCheckbox = []
    let MHEditorCheckbox = []
    let UHEditorCheckbox = []
    let GHEditorCheckbox = []

    let table=[]
    const getSecondPart=(str :String)=> { 
      var strArray = str.split('-')
      return strArray[strArray.length - 2];
    }
    const getThirdPart=(str: String)=> { 
        var strArray = str.split('-')
        return strArray[strArray.length - 1];
    }
    const handleClick = (e) => {
      var id = parseInt(getThirdPart(e.target.id))
      console.log("handleClick=>")
      console.log(id)
      var group = getSecondPart(e.target.id)
      console.log(group)
      switch (group) {
        case 'MDMonitor':
          var currentMDM = JSON.stringify(MDMonitor)
          currentMDM = JSON.parse(currentMDM)
          currentMDM[id] = !MDMonitor[id]
          setMDMonitor(currentMDM)
          break;
        case 'UDMonitor':
          var currentUDM = JSON.stringify(UDMonitor)
          currentUDM = JSON.parse(currentUDM)
          currentUDM[id] = !UDMonitor[id]
          setUDMonitor(currentUDM)
          break;
        case 'GDMonitor':
          var currentGDM = JSON.stringify(GDMonitor)
          currentGDM = JSON.parse(currentGDM)
          currentGDM[id] = !GDMonitor[id]
          setGDMonitor(currentGDM)
          break;
        case 'MHMonitor':
          var currentMHM = JSON.stringify(MHMonitor)
          currentMHM = JSON.parse(currentMHM)
          currentMHM[id] = !MHMonitor[id]
          setMHMonitor(currentMHM)
          break;
        case 'UHMonitor':
          var currentUHM = JSON.stringify(UHMonitor)
          currentUHM = JSON.parse(currentUHM)
          currentUHM[id] = !UHMonitor[id]
          setUHMonitor(currentUHM)
          break;
        case 'GHMonitor':
          var currentGHM = JSON.stringify(GHMonitor)
          currentGHM = JSON.parse(currentGHM)
          currentGHM[id] = !GHMonitor[id]
          setGHMonitor(currentGHM)
          break;
        case 'MWMonitor':
          var currentMWM = JSON.stringify(MWMonitor)
          currentMWM = JSON.parse(currentMWM)
          currentMWM[id] = !MWMonitor[id]
          setMWMonitor(currentMWM)
          break;
        case 'UWMonitor':
          var currentUWM = JSON.stringify(UWMonitor)
          currentUWM = JSON.parse(currentUWM)
          currentUWM[id] = !UWMonitor[id]
          setUWMonitor(currentUWM)
          break;
        case 'GWMonitor':
          var currentGWM = JSON.stringify(GWMonitor)
          currentGWM = JSON.parse(currentGWM)
          currentGWM[id] = !GWMonitor[id]
          setGWMonitor(currentGWM)
          break;
        case 'MDEditor':
          var currentMD = JSON.stringify(MDEditor)
          currentMD = JSON.parse(currentMD)
          currentMD[id] = !MDEditor[id]
          setMDEditor(currentMD)
          break;
        case 'UDEditor':
          var currentUD = JSON.stringify(UDEditor)
          currentUD = JSON.parse(currentUD)
          currentUD[id] = !UDEditor[id]
          setUDEditor(currentUD)
          break;
        case 'GDEditor':
          var currentGD = JSON.stringify(GDEditor)
          currentGD = JSON.parse(currentGD)
          currentGD[id] = !GDEditor[id]
          setGDEditor(currentGD)
          break;
        case 'MHEditor':
          var currentMHE = JSON.stringify(MHEditor)
          currentMHE = JSON.parse(currentMHE)
          currentMHE[id] = !MHEditor[id]
          setMHEditor(currentMHE)
          break;
        case 'UHEditor':
          var currentUHE = JSON.stringify(UHEditor)
          currentUHE = JSON.parse(currentUHE)
          currentUHE[id] = !UHEditor[id]
          setUHEditor(currentUHE)
          break;
        case 'GHEditor':
          var currentGHE = JSON.stringify(GHEditor)
          currentGHE = JSON.parse(currentGHE)
          currentGHE[id] = !GHEditor[id]
          setUHEditor(currentGHE)
          break;
        default:
          console.log('Err');
      }
    }

    for (let i = 0; i < 23; i++) {
      MDMonitorCheckbox.push(
        <input 
          id={"MDMonitor-"+i.toString()} 
          type="checkbox" 
          checked={MDMonitor[i]} 
          onClick={()=>{handleClick(event)}}
        />, 
        monitorArray[i], 
        <br />
      )

      UDMonitorCheckbox.push(
        <input 
          id={"UDMonitor-"+i.toString()} 
          type="checkbox" 
          checked={UDMonitor[i]} 
          onClick={()=>{handleClick(event)}}
        />, 
        monitorArray[i], 
        <br />
      )

      GDMonitorCheckbox.push(
        <input 
          id={"GDMonitor-"+i.toString()} 
          type="checkbox" 
          checked={GDMonitor[i]} 
          onClick={()=>{handleClick(event)}}
        />, 
        monitorArray[i], 
        <br />
      )

      MHMonitorCheckbox.push(
        <input 
          id={"MHMonitor-"+i.toString()} 
          type="checkbox" 
          checked={MHMonitor[i]} 
          onClick={()=>{handleClick(event)}}
        />, 
        monitorArray[i], 
        <br />
      )

      UHMonitorCheckbox.push(
        <input 
          id={"UHMonitor-"+i.toString()} 
          type="checkbox" 
          checked={UHMonitor[i]} 
          onClick={()=>{handleClick(event)}}
        />, 
        monitorArray[i], 
        <br />
      )

      GHMonitorCheckbox.push(
        <input 
          id={"GHMonitor-"+i.toString()} 
          type="checkbox" 
          checked={GHMonitor[i]} 
          onClick={()=>{handleClick(event)}}
        />, 
        monitorArray[i], 
        <br />
      )

      MWMonitorCheckbox.push(
        <input 
          id={"MWMonitor-"+i.toString()} 
          type="checkbox" 
          checked={MWMonitor[i]} 
          onClick={()=>{handleClick(event)}}
        />, 
        monitorArray[i], 
        <br />
      )

      UWMonitorCheckbox.push(
        <input 
          id={"UWMonitor-"+i.toString()} 
          type="checkbox" 
          checked={UWMonitor[i]} 
          onClick={()=>{handleClick(event)}}
        />, 
        monitorArray[i], 
        <br />
      )

      GWMonitorCheckbox.push(
        <input 
          id={"GWMonitor-"+i.toString()} 
          type="checkbox" 
          checked={GWMonitor[i]} 
          onClick={()=>{handleClick(event)}}
        />, 
        monitorArray[i], 
        <br />
      )
    }
    
    for (let i = 0; i < 23; i++) {
      UDEditorCheckbox.push(
        <input 
          id={"UDEditor-"+i.toString()} 
          type="checkbox" 
          checked={UDEditor[i]} 
          onClick={()=>{handleClick(event)}}
        />, 
        monitorArray[i], 
        <br />
      )
    }
    for (let i = 0; i < 23; i++) {
      GDEditorCheckbox.push(
        <input 
          id={"GDEditor-"+i.toString()} 
          type="checkbox" 
          checked={GDEditor[i]} 
          onClick={()=>{handleClick(event)}}
        />, 
        monitorArray[i], 
        <br />
      )
    }
    
    for (let i = 0; i < 23; i++) {
      MHEditorCheckbox.push(
        <input 
          id={"MHEditor-"+i.toString()} 
          type="checkbox" 
          checked={MHEditor[i]} 
          onClick={()=>{handleClick(event)}}
        />, 
        monitorArray[i], 
        <br />
      )
    }
    for (let i = 0; i < 23; i++) {
      UHEditorCheckbox.push(
        <input 
          id={"UHEditor-"+i.toString()} 
          type="checkbox" 
          checked={UHEditor[i]} 
          onClick={()=>{handleClick(event)}}
        />, 
        monitorArray[i], 
        <br />
      )
    }
    for (let i = 0; i < 23; i++) {
      GHEditorCheckbox.push(
        <input 
          id={"GHEditor-"+i.toString()} 
          type="checkbox" 
          checked={GHEditor[i]} 
          onClick={()=>{handleClick(event)}}
        />, 
        monitorArray[i], 
        <br />
      )
    }

    table.push(
      <table>
        <tr>
          <td colSpan={9} style={{textAlign:"center"}}>
            MonitorModeMainMenuBar
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{textAlign:"center"}}>
            Desktop
          </td>
          <td colSpan={3} style={{textAlign:"center"}}>
            HandHeld
          </td>
          <td colSpan={3} style={{textAlign:"center"}}>
            WebGL
          </td>
        </tr>
        <tr> 
          <td>Manager</td>
          <td>User</td>
          <td>Guest</td>
          <td>Manager</td>
          <td>User</td>
          <td>Guest</td>
          <td>Manager</td>
          <td>User</td>
          <td>Guest</td>
        </tr>
        <tr>
          <td>{MDMonitorCheckbox}</td>
          <td>{UDMonitorCheckbox}</td>
          <td>{GDMonitorCheckbox}</td>
          <td>{MHMonitorCheckbox}</td>
          <td>{UHMonitorCheckbox}</td>
          <td>{GHMonitorCheckbox}</td>
          <td>{MWMonitorCheckbox}</td>
          <td>{UWMonitorCheckbox}</td>
          <td>{GWMonitorCheckbox}</td>
        </tr>
        <br />
      </table>,
      <button onClick={()=>{handleSubmit()}}>Submmit</button>
    )
    return table
  }

  return (
    <Page>
      <SidebarContainer />
      <Wrapper>
        <Body />
      </Wrapper>
    </Page>
  );
}

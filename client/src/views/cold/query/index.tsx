import React, { useState, useReducer } from 'react';
import { SidebarContainer } from 'client/src/containers/sidebar-container';
import { Page } from 'client/src/components/page';

import { styled } from 'client/src/styles';
import { sidebarWidth } from 'client/src/styles/constants';
import { VueWrapper } from 'vuera';
import MyVueComponent from './components/MyVueComponent.vue';

import {CSVLink} from 'react-csv';

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

export const QueryCold = () => {
  const [loading, setLoading] = useState(false);
  const [didfetch, setDidfetch] = useState(false);
  const [csvData, setCsvData] = useState([
    [
      'objectId',	
      'objectName',	
      'DisplayVal0',	
      'DisplayVal1',	
      'ObjectUnitDescriptor',	
      'ControlHref',	
      'ChartURL',	
      'Discriptor',	
      'Status',	
      'Thumbnail',	
      'Language',	
      'InfKey0',	
      'InfVal0',	
      'InfKey1',	
      'InfVal1',	
      'InfKey2',	
      'InfVal2',	
      'InfKey3',	
      'InfVal3',	
      'InfKey4',	
      'InfVal4',	
      'InfKey5',	
      'InfVal5',	
      'InfKey6',	
      'InfVal6',	
      'InfKey7',	
      'InfVal7',	
      'InfKey8',	
      'InfVal8',	
      'InfKey9',	
      'InfVal9',	
      'InfKey10',	
      'InfVal10',	
      'InfKey11',	
      'InfVal11',	
      'InfKey12',	
      'InfVal12'
    ]]
  );
  
  if (localStorage.getItem('login') !== 'true') {
    localStorage.setItem('pageNow', 'Login');
    window.location.reload();
  }
  // const csvData =[
  //   [
  //     'objectId',	
  //     'objectName',	
  //     'DisplayVal0',	
  //     'DisplayVal1',	
  //     'ObjectUnitDescriptor',	
  //     'ControlHref',	
  //     'ChartURL',	
  //     'Discriptor',	
  //     'Status',	
  //     'Thumbnail',	
  //     'Language',	
  //     'InfKey0',	
  //     'InfVal0',	
  //     'InfKey1',	
  //     'InfVal1',	
  //     'InfKey2',	
  //     'InfVal2',	
  //     'InfKey3',	
  //     'InfVal3',	
  //     'InfKey4',	
  //     'InfVal4',	
  //     'InfKey5',	
  //     'InfVal5',	
  //     'InfKey6',	
  //     'InfVal6',	
  //     'InfKey7',	
  //     'InfVal7',	
  //     'InfKey8',	
  //     'InfVal8',	
  //     'InfKey9',	
  //     'InfVal9',	
  //     'InfKey10',	
  //     'InfVal10',	
  //     'InfKey11',	
  //     'InfVal11',	
  //     'InfKey12',	
  //     'InfVal12'
  //   ]
  // ];

  const railsApi = 'https://siemensproduct.nadi3docms.com/api';
  // const railsApi = 'http://10.5.117.235/api';
  // const railsApi = 'railsapi';
  const CompanyId = localStorage.getItem('CompanyId');
  const ProductId = localStorage.getItem('ProductId');
  const ProjectId = localStorage.getItem('ProjectId');
  
  const forceUpdate = useReducer(() => ({}), {})[1] as () => void;

  const fetchData = () => {
    const SOURCE_URL = `${railsApi}/${CompanyId}/${ProductId}/${ProjectId}/colddata`;
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
        console.log(res.data)
        var data = res.data
        var array :any = []
        for (var i in data){
          if(data[i].ObjectData.ObjectId !== "") {
            var objectId = data[i].ObjectData.ObjectId
            var objectName = data[i].ObjectData.DisplayName
            var DisplayVal0 = data[i].ObjectData.PointControllerInfo[0].Value
            var DisplayVal1 = data[i].ObjectData.PointControllerInfo[1].Value
            var ObjectUnitDescriptor = data[i].ObjectData.HotdataInfo[0].Value
            var ControlHref = data[i].ObjectData.PointControllerInfo[2].Value == "No available" ? "":  data[i].ObjectData.PointControllerInfo[2].Value
            var ChartURL =  data[i].ObjectData.ChartURL
            var Discriptor = data[i].ObjectData.Discriptor
            var Status = data[i].ObjectData.Status
            var Thumbnail = data[i].ObjectData.Thumbnail
            var Language :any = ""
            var InfKey0 = data[i].ObjectData.Information.length>0?data[i].ObjectData.Information[0].Key:""
            var InfVal0 = data[i].ObjectData.Information.length>0?data[i].ObjectData.Information[0].Val:""
            var InfKey1 = data[i].ObjectData.Information.length>1?data[i].ObjectData.Information[1].Key:""
            var InfVal1 = data[i].ObjectData.Information.length>1?data[i].ObjectData.Information[1].Val:""
            var InfKey2 = data[i].ObjectData.Information.length>2?data[i].ObjectData.Information[2].Key:""
            var InfVal2 = data[i].ObjectData.Information.length>2?data[i].ObjectData.Information[2].Val:""
            var InfKey3 = data[i].ObjectData.Information.length>3?data[i].ObjectData.Information[3].Key:""
            var InfVal3 = data[i].ObjectData.Information.length>3?data[i].ObjectData.Information[3].Val:""
            var InfKey4 = data[i].ObjectData.Information.length>4?data[i].ObjectData.Information[4].Key:""
            var InfVal4 = data[i].ObjectData.Information.length>4?data[i].ObjectData.Information[4].Val:""
            var InfKey5 = data[i].ObjectData.Information.length>5?data[i].ObjectData.Information[5].Key:""
            var InfVal5 = data[i].ObjectData.Information.length>5?data[i].ObjectData.Information[5].Val:""
            var InfKey6 = data[i].ObjectData.Information.length>6?data[i].ObjectData.Information[6].Key:""
            var InfVal6 = data[i].ObjectData.Information.length>6?data[i].ObjectData.Information[6].Val:""
            var InfKey7 = data[i].ObjectData.Information.length>7?data[i].ObjectData.Information[7].Key:""
            var InfVal7 = data[i].ObjectData.Information.length>7?data[i].ObjectData.Information[7].Val:""
            var InfKey8 = data[i].ObjectData.Information.length>8?data[i].ObjectData.Information[8].Key:""
            var InfVal8 = data[i].ObjectData.Information.length>8?data[i].ObjectData.Information[8].Val:""
            var InfKey9 = data[i].ObjectData.Information.length>9?data[i].ObjectData.Information[9].Key:""
            var InfVal9 = data[i].ObjectData.Information.length>9?data[i].ObjectData.Information[9].Val:""
            var InfKey10 = data[i].ObjectData.Information.length>10?data[i].ObjectData.Information[10].Key:""
            var InfVal10 = data[i].ObjectData.Information.length>10?data[i].ObjectData.Information[10].Val:""
            var InfKey11 = data[i].ObjectData.Information.length>11?data[i].ObjectData.Information[11].Key:""
            var InfVal11 = data[i].ObjectData.Information.length>11?data[i].ObjectData.Information[11].Val:""
            var InfKey12 = data[i].ObjectData.Information.length>12?data[i].ObjectData.Information[12].Key:""
            var InfVal12 = data[i].ObjectData.Information.length>12?data[i].ObjectData.Information[12].Val:""
            var array :any = csvData
            array.push([
              objectId,
              objectName,
              DisplayVal0,
              DisplayVal1,
              ObjectUnitDescriptor,
              ControlHref,
              ChartURL,
              Discriptor,
              Status,
              Thumbnail,
              Language,
              InfKey0,
              InfVal0,
              InfKey1,
              InfVal1,
              InfKey2,
              InfVal2,
              InfKey3,
              InfVal3,
              InfKey4,
              InfVal4,
              InfKey5,
              InfVal5,
              InfKey6,
              InfVal6,
              InfKey7,
              InfVal7,
              InfKey8,
              InfVal8,
              InfKey9,
              InfVal9,
              InfKey10,
              InfVal10,
              InfKey11,
              InfVal11,
              InfKey12,
              InfVal12,
            ])
            setCsvData(array)
          }
        }
        setLoading(!loading);
        forceUpdate();
      }
    });
  };

  if (!didfetch) {
    fetchData()
    setDidfetch(!didfetch)
  }

  const csvDownloadLink = () => {
    if(!loading){
      return <div>loading ...</div>
    }
    return (
      <>
        <button><CSVLink data={csvData} >Download CSV</CSVLink></button>
      </>
    )
  }
  return (
    <Page>
      <SidebarContainer />
      <Wrapper>
      {csvDownloadLink()}
        <VueWrapper component={MyVueComponent} />
      </Wrapper>
    </Page>
  );
  
};

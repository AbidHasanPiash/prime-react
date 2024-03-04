'use client'
import React, { useEffect, useRef, useState } from 'react';
//import { useRouter } from 'next/router';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';


import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from './service/NodeService';

export default function Home() {
  //const router = useRouter();
  const toast = useRef(null);
  const items = [
      {
          label: 'Update',
          icon: 'pi pi-refresh',
          command: () => {
              toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
          }
      },
      {
          label: 'Delete',
          icon: 'pi pi-times',
          command: () => {
              toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
          }
      },
      {
          label: 'React Website',
          icon: 'pi pi-external-link',
          command: () => {
              window.location.href = 'https://reactjs.org/';
          }
      },
      {
          label: 'Upload',
          icon: 'pi pi-upload',
          command: () => {
              //router.push('/fileupload');
          }
      }
  ];

  const save = () => {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
  };


  
  const [nodes, setNodes] = useState([]);
  const [selectedNodeKeys, setSelectedNodeKeys] = useState(null);
  useEffect(() => {
      NodeService.getTreeTableNodes().then((data) => setNodes(data));
  }, []);
  
  return (
    <main className='flex flex-col items-center justify-center'>
      <h1>Welcome to my Next.js app with PrimeReact!</h1>
      <div className="card flex justify-content-center space-x-20">
        <Toast ref={toast}></Toast>
        <SplitButton label="Save" icon="pi pi-plus" onClick={save} model={items} rounded />
        <SplitButton label="Save" icon="pi pi-plus" onClick={save} model={items} severity="secondary" rounded />
        <SplitButton label="Save" icon="pi pi-plus" onClick={save} model={items} severity="success" rounded />
        <SplitButton label="Save" icon="pi pi-plus" onClick={save} model={items} severity="info" rounded />
        <SplitButton label="Save" icon="pi pi-plus" onClick={save} model={items} severity="warning" rounded />
        <SplitButton label="Save" icon="pi pi-plus" onClick={save} model={items} severity="help" rounded />
        <SplitButton label="Save" icon="pi pi-plus" onClick={save} model={items} severity="danger" rounded />
      </div>
      <div className="card">
        <TreeTable value={nodes} selectionMode="checkbox" selectionKeys={selectedNodeKeys} onSelectionChange={(e) => setSelectedNodeKeys(e.value)} tableStyle={{ minWidth: '50rem' }}>
          <Column field="name" header="Name" expander></Column>
          <Column field="size" header="Size"></Column>
          <Column field="type" header="Type"></Column>
        </TreeTable>
      </div>
    </main>
  );
}

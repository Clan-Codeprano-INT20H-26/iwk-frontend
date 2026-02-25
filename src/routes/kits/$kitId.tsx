import { createFileRoute } from '@tanstack/react-router';
import { getKitById } from '@/api/kit';
import { Kit } from '@/types/kit';
import { useState, useEffect } from 'react';

const KitPage = () => {
  const { kitId } = Route.useParams();
  const [kitInfo, setKitInfo] = useState<Kit | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [isErorr, setIsError] = useState(false)
  useEffect(()=> {
    if(!kitId) return;
    const fetchKit = async() => {
      setIsLoading(true),
      setIsError(false);
      try{
        const data = await getKitById(kitId);
        setKitInfo(data);
        getKitById(kitId)
        console.log(kitInfo)
      }catch(error){
        console.log(error)
      }
      finally{
        setIsLoading(false)
      }
    }
    fetchKit()
  },[kitId])
  return <div>Hello, {kitId}!
  <p>
    {}</p></div>;
};

export const Route = createFileRoute('/kits/$kitId')({
  component: KitPage,
});

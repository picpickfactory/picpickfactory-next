const bbk = [ "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/BKKCIRCUS01.jpg?alt=media&token=1bca2fbf-2902-4761-945f-167dc12200cd",
    "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/BKKCIRCUS02.jpg?alt=media&token=4a06006c-aee9-4218-99e4-0ce38a6e3a42",
    "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/BKKCIRCUSLONGWAY.jpg?alt=media&token=d68d460f-9480-43cc-85c6-11c44afcb447",
    "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/LB.jpg?alt=media&token=b41e836a-cdc4-4041-ad8e-091a0ee70d67",
    "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/Red-004.jpg?alt=media&token=f3640af6-43d6-4398-ac4c-dd25df69aa52",
    "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/Red-019.jpg?alt=media&token=d88fddc1-c735-4eeb-b6d0-4c5cd2a5474d",
    "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/Red-028.jpg?alt=media&token=d9d6304e-c1ad-486d-8dcb-d6957a715082",
    "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/Red-030.jpg?alt=media&token=3e0f9f61-30ad-4427-8727-28298facb911",
    "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/S1-023.jpg?alt=media&token=a810daf3-50e3-42e6-930c-f6e8955fbf1f"
]
    


export default function Page({ params }: { params: { category: string, subcategory: string } }) {
    return <h1>{params.category}-{params.subcategory}</h1>
}
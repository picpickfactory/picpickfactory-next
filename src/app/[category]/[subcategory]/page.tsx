export default function Page({ params }: { params: { category: string, subcategory: string } }) {
    return <h1>{params.category}-{params.subcategory}</h1>
}
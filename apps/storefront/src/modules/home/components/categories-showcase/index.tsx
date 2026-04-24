import { listCategories } from "@/lib/data/categories"
import CategoryNavigation from "@/modules/store/components/category-navigation"

const CategoriesShowcase = async () => {
  const categories = await listCategories()

  return (
    <section className="section-shell bg-white">
      <div className="content-container">
        <div className="section-heading">
          <span className="section-kicker">Browse smarter</span>
          <h2 className="section-title">Shop by category</h2>
          <p className="section-copy">
            Give customers a fast route into the catalog with cleaner, more trustworthy category browsing.
          </p>
        </div>

        <CategoryNavigation categories={categories} />
      </div>
    </section>
  )
}

export default CategoriesShowcase

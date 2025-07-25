import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CameraColorPickerModal from "./CameraColorPickerModal" // Import your modal

const ProductForm = ({ product, setProduct, onSave, onCancel, isEdit = false }) => {
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [activeColorIndex, setActiveColorIndex] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((p) => ({
      ...p,
      [name]: ["price", "originalPrice", "rating"].includes(name) ? Number(value) : value,
    }))
  }

  const handleArrChange = (field, idx, key, val) => {
    setProduct((p) => {
      const arr = [...p[field]]
      arr[idx] = {
        ...arr[idx],
        [key]: key === "amountOfSiize" ? Number(val) : val,
      }
      return { ...p, [field]: arr }
    })
  }

  const addArrItem = (field, template) => {
    setProduct((p) => ({ ...p, [field]: [...p[field], template] }))
  }

  const removeArrItem = (field, index) => {
    setProduct((p) => ({
      ...p,
      [field]: p[field].filter((_, i) => i !== index),
    }))
  }

  const openColorPicker = (index) => {
    setActiveColorIndex(index)
    setColorPickerOpen(true)
  }

  const handleColorPick = (hex) => {
    if (activeColorIndex !== null) {
      handleArrChange("colors", activeColorIndex, "colorValue", hex)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input name="name" value={product.name} onChange={handleChange} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price</Label>
              <Input name="price" type="number" value={product.price} onChange={handleChange} />
            </div>
            <div>
              <Label>Original Price</Label>
              <Input
                name="originalPrice"
                type="number"
                value={product.originalPrice}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <Label>Cover Image URL</Label>
            <Input name="coverImage" value={product.coverImage} onChange={handleChange} />
          </div>
          <div>
            <Label>Category</Label>
            <Select
              name="category"
              value={product.category}
              onValueChange={(val) => setProduct((prev) => ({ ...prev, category: val }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="set">Sets</SelectItem>
                <SelectItem value="bras">Bras</SelectItem>
                <SelectItem value="bralletes">Bralletes</SelectItem>
                <SelectItem value="gym-wears">Gym wears</SelectItem>
                <SelectItem value="lingeries">Lingeries</SelectItem>
                <SelectItem value="lounge-wears">Lounge wears</SelectItem>
                <SelectItem value="panties">Panties</SelectItem>
                <SelectItem value="shorts">Shorts</SelectItem>
                <SelectItem value="sleep-wears">Sleep wears</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Rating</Label>
            <Input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={product.rating}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Images */}
          <div>
            <Label>Images</Label>
            {product.images.map((url, i) => (
              <div key={i} className="flex">
                <Input
                  value={url}
                  onChange={(e) => {
                    const arr = [...product.images]
                    arr[i] = e.target.value
                    setProduct((p) => ({ ...p, images: arr }))
                  }}
                />
                <Button size="icon" variant="ghost" onClick={() => removeArrItem("images", i)}>
                  X
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addArrItem("images", "")}>
              Add Image
            </Button>
          </div>

          {/* Features */}
          <div>
            <Label>Features</Label>
            {product.features.map((f, i) => (
              <div key={i} className="flex">
                <Input
                  value={f}
                  onChange={(e) => {
                    const arr = [...product.features]
                    arr[i] = e.target.value
                    setProduct((p) => ({ ...p, features: arr }))
                  }}
                />
                <Button size="icon" variant="ghost" onClick={() => removeArrItem("features", i)}>
                  X
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addArrItem("features", "")}>
              Add Feature
            </Button>
          </div>

          {/* Colors */}
          <div>
            <Label>Colors</Label>
            {product.colors.map((c, i) => (
              <div key={i} className="flex space-x-2 items-center">
                <Input
                  placeholder="Name"
                  value={c.colorName}
                  onChange={(e) => handleArrChange("colors", i, "colorName", e.target.value)}
                />
                <Input
                  placeholder="#hex"
                  value={c.colorValue}
                  onChange={(e) => handleArrChange("colors", i, "colorValue", e.target.value)}
                />
                <Button size="icon" variant="ghost" onClick={() => removeArrItem("colors", i)}>
                  X
                </Button>
                <Button variant="secondary" size="sm" onClick={() => openColorPicker(i)}>
                  🎥
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addArrItem("colors", { colorName: "", colorValue: "" })}
            >
              Add Color
            </Button>
          </div>

          {/* Sizes */}
          <div>
            <Label>Sizes</Label>
            {product.sizes.map((s, i) => (
              <div key={i} className="flex space-x-2">
                <Input
                  placeholder="Size"
                  value={s.size}
                  onChange={(e) => handleArrChange("sizes", i, "size", e.target.value)}
                />
                <Input
                  placeholder="Qty"
                  type="number"
                  value={s.amountOfSiize}
                  onChange={(e) => handleArrChange("sizes", i, "amountOfSiize", e.target.value)}
                />
                <Button size="icon" variant="ghost" onClick={() => removeArrItem("sizes", i)}>
                  X
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addArrItem("sizes", { size: "", amountOfSiize: 0 })}
            >
              Add Size
            </Button>
          </div>
        </div>

        {/* Form Actions */}
        <div className="col-span-full flex justify-end mt-4 space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white" onClick={onSave}>
            {isEdit ? "Update Product" : "Save Product"}
          </Button>
        </div>
      </div>

      {/* Camera Color Picker Modal */}
      <CameraColorPickerModal
        open={colorPickerOpen}
        onClose={() => setColorPickerOpen(false)}
        onPickColor={handleColorPick}
      />
    </>
  )
}

export default ProductForm

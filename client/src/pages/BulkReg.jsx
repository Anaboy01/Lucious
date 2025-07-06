import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import PageHeader from "@/components/categories/PageHeader";
import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom";
import { ChevronLeft, Minus, Square, X } from "lucide-react";
import { useProduct } from "@/context/ProductContext";




const emptyTemplate = {
  name: "",
  description: "",
  price: 0,
  originalPrice: 0,
  coverImage: "",
  images: [""],
  category: "",
  rating: 0,
  features: [""],
  colors: [{ colorName: "", colorValue: "" }],
  sizes: [{ size: "", amountOfSiize: 0 }],
};

const BulkReg = () => {
  const [forms, setForms] = useState([{ ...emptyTemplate }]);
  const [expandedForms, setExpandedForms] = useState([true]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {bulkCreateProducts} = useProduct()

  const handleFieldChange = (idx, e) => {
    const { name, value } = e.target;
    setForms((f) =>
      f.map((item, i) =>
        i === idx
          ? {
              ...item,
              [name]: ["price", "originalPrice", "rating"].includes(name)
                ? Number(value)
                : value,
            }
          : item
      )
    );
  };

  const handleArrayChange = (idx, field, arrIdx, key, value) => {
    setForms((f) =>
      f.map((item, i) => {
        if (i !== idx) return item;
        const arr = [...item[field]];
        if (typeof arr[arrIdx] === "string") {
          arr[arrIdx] = value;
        } else {
          arr[arrIdx] = {
            ...arr[arrIdx],
            [key]: ["amountOfSiize"].includes(key) ? Number(value) : value,
          };
        }
        return { ...item, [field]: arr };
      })
    );
  };

  const addArrayItem = (idx, field) => {
    setForms((f) =>
      f.map((item, i) => {
        if (i !== idx) return item;
        const template =
          field === "colors"
            ? { colorName: "", colorValue: "" }
            : field === "sizes"
            ? { size: "", amountOfSiize: 0 }
            : "";
        return { ...item, [field]: [...item[field], template] };
      })
    );
  };

  const removeArrayItem = (idx, field, arrIdx) => {
    setForms((f) =>
      f.map((item, i) => {
        if (i !== idx) return item;
        const arr = item[field].filter((_, j) => j !== arrIdx);
        return {
          ...item,
          [field]: arr.length ? arr : [emptyTemplate[field][0]],
        };
      })
    );
  };

  const addForm = () => {
    setForms((f) => [...f, { ...emptyTemplate }]);
    setExpandedForms((f) => [...f, true]);
  };

  const removeForm = (idx) => {
    setForms((f) => f.filter((_, i) => i !== idx));
    setExpandedForms((f) => f.filter((_, i) => i !== idx));
  };

  const toggleExpand = (idx) => {
    setExpandedForms((f) => f.map((v, i) => (i === idx ? !v : v)));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await bulkCreateProducts({ products: forms });
      setMessage(res.message);
      setForms([{ ...emptyTemplate }]);
      setExpandedForms([true]);
    } catch (err) {
      setMessage(err.message || "Bulk registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <PageHeader />
      <div className="container mx-auto p-6 space-y-6">
        <Link className="flex items-center  text-pink-600 " to="/admin">
           <ChevronLeft/>  <span>back</span>
        </Link>
        <h1 className="text-3xl font-bold text-center text-pink-700">
          Bulk Register Products
        </h1>
        {message && <p className="text-center text-pink-600">{message}</p>}
        <div className="flex flex-col items-center space-y-6">
          {forms.map((form, idx) => (
            <Card
              key={idx}
              className="bg-pink-50/80 w-full max-w-4xl backdrop-blur-sm border-pink-300 rounded-2xl overflow-hidden"
            >
              <CardHeader className="bg-pink-200 p-4 rounded-t-2xl flex flex-row   justify-between items-center">
                <CardTitle className="text-pink-700">
                  Product #{idx + 1}
                </CardTitle>
                <div className="space-x-2">
                  <Button
                  size="xs"
                    variant="outline"
                    className=" text-pink-600 border-pink-300  hover:text-pink-600  hover:border-pink-300 "
                    onClick={() => toggleExpand(idx)}
                  >
                    {expandedForms[idx] ? <Minus/> : <Square/>}
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    className="text-pink-600 border-pink-300  hover:text-pink-600  hover:border-pink-300 "
                    onClick={() => removeForm(idx)}
                  >
                   <X/>
                  </Button>
                </div>
              </CardHeader>

              {/* Animated Collapse Content */}
              <div
                className={`transition-all duration-1000 ease-in-out overflow-hidden ${
                  expandedForms[idx]
                    ? "max-h-[3000px] opacity-100 p-6"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Side */}
                  <div className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        name="name"
                        value={form.name}
                        onChange={(e) => handleFieldChange(idx, e)}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        name="description"
                        value={form.description}
                        onChange={(e) => handleFieldChange(idx, e)}
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Price</Label>
                        <Input
                          name="price"
                          type="number"
                          value={form.price}
                          onChange={(e) => handleFieldChange(idx, e)}
                        />
                      </div>
                      <div>
                        <Label>Original Price</Label>
                        <Input
                          name="originalPrice"
                          type="number"
                          value={form.originalPrice}
                          onChange={(e) => handleFieldChange(idx, e)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Cover Image</Label>
                      <Input
                        name="coverImage"
                        value={form.coverImage}
                        onChange={(e) => handleFieldChange(idx, e)}
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select
                        name="category"
                        value={form.category}
                        onValueChange={(value) =>
                          handleFieldChange(idx, {
                            target: { name: "category", value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="set">Set</SelectItem>
                          <SelectItem value="bras">Bras</SelectItem>
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
                        value={form.rating}
                        onChange={(e) => handleFieldChange(idx, e)}
                      />
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="space-y-4">
                    {/* Features */}
                    <div>
                      <Label>Features</Label>
                      {form.features.map((f, i) => (
                        <div key={i} className="flex items-center space-x-2 mb-2">
                          <Input
                            value={f}
                            onChange={(e) =>
                              handleArrayChange(
                                idx,
                                "features",
                                i,
                                null,
                                e.target.value
                              )
                            }
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              removeArrayItem(idx, "features", i)
                            }
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem(idx, "features")}
                      >
                        Add Feature
                      </Button>
                    </div>

                    {/* Images */}
                    <div>
                      <Label>Images</Label>
                      {form.images.map((url, i) => (
                        <div key={i} className="flex items-center space-x-2 mb-2">
                          <Input
                            value={url}
                            onChange={(e) =>
                              handleArrayChange(
                                idx,
                                "images",
                                i,
                                null,
                                e.target.value
                              )
                            }
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeArrayItem(idx, "images", i)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem(idx, "images")}
                      >
                        Add Image
                      </Button>
                    </div>

                    {/* Colors */}
                    <div>
                      <Label>Colors</Label>
                      {form.colors.map((c, i) => (
                        <div key={i} className="flex items-center space-x-2 mb-2">
                          <Input
                            placeholder="Name"
                            value={c.colorName}
                            onChange={(e) =>
                              handleArrayChange(
                                idx,
                                "colors",
                                i,
                                "colorName",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            placeholder="#hex"
                            value={c.colorValue}
                            onChange={(e) =>
                              handleArrayChange(
                                idx,
                                "colors",
                                i,
                                "colorValue",
                                e.target.value
                              )
                            }
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeArrayItem(idx, "colors", i)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem(idx, "colors")}
                      >
                        Add Color
                      </Button>
                    </div>

                    {/* Sizes */}
                    <div>
                      <Label>Sizes</Label>
                      {form.sizes.map((s, i) => (
                        <div key={i} className="flex items-center space-x-2 mb-2">
                          <Input
                            placeholder="Size"
                            value={s.size}
                            onChange={(e) =>
                              handleArrayChange(
                                idx,
                                "sizes",
                                i,
                                "size",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            placeholder="Qty"
                            type="number"
                            value={s.amountOfSiize}
                            onChange={(e) =>
                              handleArrayChange(
                                idx,
                                "sizes",
                                i,
                                "amountOfSiize",
                                e.target.value
                              )
                            }
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeArrayItem(idx, "sizes", i)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem(idx, "sizes")}
                      >
                        Add Size
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            className="text-pink-600 border-pink-300  hover:text-pink-600  hover:border-pink-300 "
            onClick={addForm}
          >
            Add Another Product
          </Button>
          <Button
            className="bg-gradient-to-r from-pink-500 to-red-800 text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit All"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkReg;

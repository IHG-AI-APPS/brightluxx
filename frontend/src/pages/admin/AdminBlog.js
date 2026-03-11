import React, { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, FileText, Eye, EyeOff, Star, Search, Upload, Image, X, ExternalLink } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL || '';

const CATEGORIES = ['Technology', 'Guides', 'Industry', 'Technical', 'News', 'Case Study'];

export default function AdminBlog() {
  const [blogs, setBlogs] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Form state
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    author: 'Brightluxx Team',
    image_url: '',
    read_time: '5 min',
    tags: '',
    is_published: false,
    featured: false,
  });

  const token = localStorage.getItem('blx_admin_token');

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBlogs(data.blogs || []);
      setCounts(data.counts || {});
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openCreateModal = () => {
    setEditingBlog(null);
    setForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Technology',
      author: 'Brightluxx Team',
      image_url: '',
      read_time: '5 min',
      tags: '',
      is_published: false,
      featured: false,
    });
    setShowModal(true);
  };

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setForm({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: blog.category || 'Technology',
      author: blog.author || 'Brightluxx Team',
      image_url: blog.image_url || '',
      read_time: blog.read_time || '5 min',
      tags: (blog.tags || []).join(', '),
      is_published: blog.is_published || false,
      featured: blog.featured || false,
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API}/api/admin/blogs/upload-image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setForm({ ...form, image_url: data.image_url });
      } else {
        alert(data.detail || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      slug: form.slug || undefined,
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      author: form.author,
      image_url: form.image_url || null,
      read_time: form.read_time,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      is_published: form.is_published,
      featured: form.featured,
    };

    try {
      const url = editingBlog
        ? `${API}/api/admin/blogs/${editingBlog.id}`
        : `${API}/api/admin/blogs`;
      const method = editingBlog ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        fetchBlogs();
      } else {
        const err = await res.json();
        alert(err.detail || 'Failed to save');
      }
    } catch (err) {
      console.error('Failed to save blog:', err);
    }
    setSaving(false);
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const res = await fetch(`${API}/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchBlogs();
      }
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  const handleSeed = async () => {
    if (!window.confirm('This will seed sample blog posts. Continue?')) return;

    try {
      const res = await fetch(`${API}/api/admin/blogs/seed`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(data.message);
      fetchBlogs();
    } catch (err) {
      console.error('Failed to seed blogs:', err);
    }
  };

  const togglePublished = async (blog) => {
    try {
      await fetch(`${API}/api/admin/blogs/${blog.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_published: !blog.is_published }),
      });
      fetchBlogs();
    } catch (err) {
      console.error('Failed to toggle blog:', err);
    }
  };

  const toggleFeatured = async (blog) => {
    try {
      await fetch(`${API}/api/admin/blogs/${blog.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ featured: !blog.featured }),
      });
      fetchBlogs();
    } catch (err) {
      console.error('Failed to toggle featured:', err);
    }
  };

  const filteredBlogs = blogs.filter(b => {
    if (filterStatus === 'published' && !b.is_published) return false;
    if (filterStatus === 'drafts' && b.is_published) return false;
    if (filterStatus === 'featured' && !b.featured) return false;
    if (search) {
      const q = search.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.excerpt?.toLowerCase().includes(q);
    }
    return true;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="p-6" data-testid="admin-blog-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-wider">Blog Management</h1>
          <p className="text-sm text-[var(--blx-muted)] mt-1">
            Create and manage blog posts, articles, and industry insights
          </p>
        </div>
        <div className="flex gap-2">
          {counts.total === 0 && (
            <button
              onClick={handleSeed}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              data-testid="seed-blogs-btn"
            >
              Seed Sample Posts
            </button>
          )}
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            style={{ background: 'var(--blx-gold-grad)', color: '#0B0B0B' }}
            data-testid="add-blog-btn"
          >
            <Plus size={16} /> New Post
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-[var(--blx-gold-3)]">{counts.total || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Total Posts</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{counts.published || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Published</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">{counts.drafts || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Drafts</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{counts.featured || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Featured</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg text-sm bg-[var(--blx-bg-raised)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
            data-testid="search-blogs"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'published', 'drafts', 'featured'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                filterStatus === status ? 'bg-[var(--blx-gold-3)] text-black' : 'bg-[var(--blx-bg-raised)] border border-[var(--blx-border)]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Table */}
      {loading ? (
        <div className="text-center py-12 text-[var(--blx-muted)]">Loading...</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-12 glass-panel">
          <FileText size={40} className="mx-auto mb-4 text-[var(--blx-muted)]" />
          <p className="text-[var(--blx-muted)]">No blog posts found</p>
          {counts.total === 0 && (
            <button onClick={handleSeed} className="mt-4 text-[var(--blx-gold-3)] text-sm hover:underline">
              Seed sample posts
            </button>
          )}
        </div>
      ) : (
        <div className="glass-panel overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--blx-border)]">
                <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[var(--blx-muted)]">POST</th>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[var(--blx-muted)]">CATEGORY</th>
                <th className="px-4 py-3 text-center text-xs font-bold tracking-wider text-[var(--blx-muted)]">STATUS</th>
                <th className="px-4 py-3 text-center text-xs font-bold tracking-wider text-[var(--blx-muted)]">FEATURED</th>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[var(--blx-muted)]">DATE</th>
                <th className="px-4 py-3 text-right text-xs font-bold tracking-wider text-[var(--blx-muted)]">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="border-b border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[rgba(255,255,255,0.05)]">
                        {blog.image_url ? (
                          <img src={blog.image_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Image size={16} className="text-[var(--blx-muted)]" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate max-w-[300px]">{blog.title}</div>
                        <div className="text-xs text-[var(--blx-muted)] truncate max-w-[300px]">{blog.excerpt}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded bg-[rgba(255,255,255,0.05)]">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => togglePublished(blog)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                        blog.is_published 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                      title={blog.is_published ? 'Click to unpublish' : 'Click to publish'}
                    >
                      {blog.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {blog.is_published ? 'Live' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleFeatured(blog)}
                      className={`p-1.5 rounded ${
                        blog.featured 
                          ? 'text-purple-400' 
                          : 'text-[var(--blx-muted)] hover:text-purple-400'
                      }`}
                      title={blog.featured ? 'Remove from featured' : 'Mark as featured'}
                    >
                      <Star size={16} fill={blog.featured ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--blx-muted)]">
                    {formatDate(blog.published_at || blog.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      {blog.is_published && (
                        <a
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[var(--blx-muted)] hover:text-[var(--blx-gold-3)]"
                          title="View post"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <button
                        onClick={() => openEditModal(blog)}
                        className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[var(--blx-muted)] hover:text-[var(--blx-gold-3)]"
                        title="Edit"
                        data-testid={`edit-blog-${blog.id}`}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[var(--blx-muted)] hover:text-red-400"
                        title="Delete"
                        data-testid={`delete-blog-${blog.id}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[var(--blx-bg-raised)] rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col my-auto">
            <div className="p-6 border-b border-[var(--blx-border)] flex-shrink-0">
              <h2 className="text-lg font-bold">{editingBlog ? 'Edit Blog Post' : 'Create New Post'}</h2>
            </div>
            <form id="blog-form" onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Featured Image */}
              <div className="border border-dashed border-[var(--blx-border)] rounded-lg p-4">
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-2">Featured Image</label>
                
                {form.image_url ? (
                  <div className="relative">
                    <img 
                      src={form.image_url} 
                      alt="Featured" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image_url: '' })}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80"
                      title="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      data-testid="blog-image-input"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                      data-testid="blog-upload-btn"
                    >
                      {uploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[var(--blx-gold-3)] border-t-transparent rounded-full animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload size={14} /> Upload Image
                        </>
                      )}
                    </button>
                    <p className="text-[0.65rem] text-[var(--blx-muted)]">
                      Recommended: 1200x630px (JPEG, PNG, WebP)
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  data-testid="blog-title-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Slug (auto-generated)</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="leave-empty-to-auto-generate"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                    data-testid="blog-slug-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                    data-testid="blog-category-select"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Excerpt *</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  required
                  rows={2}
                  placeholder="Brief summary shown in blog listings..."
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none resize-none"
                  data-testid="blog-excerpt-input"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Content * (HTML supported)</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  required
                  rows={8}
                  placeholder="<h2>Section Title</h2><p>Your content here...</p>"
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none resize-none font-mono"
                  data-testid="blog-content-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Author</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                    data-testid="blog-author-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Read Time</label>
                  <input
                    type="text"
                    value={form.read_time}
                    onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                    placeholder="5 min"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                    data-testid="blog-readtime-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="Technology, LED, Dubai"
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  data-testid="blog-tags-input"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_published}
                    onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Publish immediately</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Featured post</span>
                </label>
              </div>
            </form>
            <div className="flex gap-3 p-6 border-t border-[var(--blx-border)] flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.05)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="blog-form"
                disabled={saving}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: 'var(--blx-gold-grad)', color: '#0B0B0B' }}
                data-testid="save-blog-btn"
              >
                {saving ? 'Saving...' : editingBlog ? 'Update Post' : 'Create Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

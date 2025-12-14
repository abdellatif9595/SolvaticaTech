import { useState } from 'react'
import Image from 'next/image'

interface Comment {
  id: string
  author: {
    name: string
    image: string
  }
  content: string
  date: string
  replies?: Comment[]
}

interface CommentsProps {
  postId: string
  initialComments?: Comment[]
}

export default function Comments({ postId, initialComments = [] }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      // Simuler l'envoi d'un commentaire
      const comment: Comment = {
        id: Date.now().toString(),
        author: {
          name: 'Utilisateur',
          image: '/images/avatar-placeholder.jpg'
        },
        content: newComment,
        date: new Date().toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }

      setComments([...comments, comment])
      setNewComment('')
    } catch (error) {
      console.error('Erreur lors de l\'envoi du commentaire:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const CommentItem = ({ comment }: { comment: Comment }) => (
    <div className="mb-6">
      <div className="flex items-start space-x-4">
        <div className="relative w-10 h-10">
          <Image
            src={comment.author.image}
            alt={comment.author.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{comment.author.name}</h4>
              <span className="text-sm text-gray-500">{comment.date}</span>
            </div>
            <p className="text-gray-600">{comment.content}</p>
          </div>
          <div className="mt-2 flex items-center space-x-4">
            <button className="text-sm text-gray-500 hover:text-primary-600 transition">
              Répondre
            </button>
            <button className="text-sm text-gray-500 hover:text-primary-600 transition">
              J'aime
            </button>
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-12 mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-8">
        Commentaires ({comments.length})
      </h2>

      {/* Formulaire de commentaire */}
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Écrivez votre commentaire..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Envoi...' : 'Publier le commentaire'}
        </button>
      </form>

      {/* Liste des commentaires */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">
            Soyez le premier à commenter cet article !
          </p>
        )}
      </div>
    </div>
  )
} 
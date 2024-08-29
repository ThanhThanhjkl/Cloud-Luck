package cloudfundding.accountApplication.service;

import cloudfundding.accountApplication.entity.Comment;
import cloudfundding.accountApplication.model.*;
import cloudfundding.accountApplication.repository.CommentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public interface CommentService {
    CommentDTO createComment(CommentDTO commentDTO);

    List<CommentDTO> getByProductId(int productId);

    boolean deleteComment(int id);
}
@Transactional
@Service
class CommentServiceImpl implements CommentService {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public CommentDTO createComment(CommentDTO commentDTO) {
        Comment comment = modelMapper.map(commentDTO, Comment.class);
        comment.setDate(String.valueOf(LocalDateTime.now()));
        Comment savedComment = commentRepository.save(comment);
        return modelMapper.map(savedComment, CommentDTO.class);
    }

    @Override
    public List<CommentDTO> getByProductId(int productId) {
        List<CommentDTO> commentDTOs = new ArrayList<>();
        List<Comment> Comments = commentRepository.findAllByProductId(productId);
        for (Comment comment : Comments) {
            commentDTOs.add(modelMapper.map(comment, CommentDTO.class));
        }
        return commentDTOs;
    }

    @Override
    public boolean deleteComment(int id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}